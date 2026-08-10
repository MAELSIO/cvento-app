const DEFAULT_API_BASE = "https://cvento.fr";

const app = document.getElementById("app");

async function getStorage() {
  return chrome.storage.local.get(["cvento_token", "cvento_api_base"]);
}

async function setStorage(values) {
  return chrome.storage.local.set(values);
}

async function fetchProfile(apiBase, token) {
  const res = await fetch(`${apiBase}/api/extension/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(res.status === 401 ? "Jeton invalide ou révoqué." : "Erreur de connexion.");
  return res.json();
}

/**
 * Fonction injectée dans la page active — doit rester autonome (Chrome la
 * sérialise et l'exécute dans le contexte de la page, sans accès aux
 * variables de popup.js). Ne remplit que les champs vides, ne coche
 * jamais de case automatiquement, et privilégie la prudence à
 * l'exhaustivité : mieux vaut un champ non rempli qu'un champ mal rempli.
 */
function cventoFillForm(profile) {
  function labelTextFor(el) {
    let text = "";
    if (el.id) {
      const lbl = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (lbl) text += " " + lbl.textContent;
    }
    const parentLabel = el.closest("label");
    if (parentLabel) text += " " + parentLabel.textContent;
    return text;
  }

  function signatureOf(el) {
    return [el.name, el.id, el.placeholder, el.getAttribute("aria-label"), el.autocomplete, labelTextFor(el)]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function setValue(el, value) {
    if (!value) return false;
    const proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
    setter.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  const excludeForNom = /entreprise|soci[ée]t[ée]|employeur|poste|fonction|company/i;

  const rules = [
    { test: (sig) => /pr[ée]nom|first.?name|given.?name/i.test(sig), value: profile.prenom },
    {
      test: (sig) => !excludeForNom.test(sig) && /\bnom\b|last.?name|surname|family.?name/i.test(sig),
      value: profile.nom,
    },
    { test: (sig, el) => el.type === "email" || /e.?mail/i.test(sig), value: profile.email },
    { test: (sig, el) => el.type === "tel" || /t[ée]l[ée]phone|mobile|portable|\btel\b|phone/i.test(sig), value: profile.phone },
    { test: (sig) => /\bville\b|\bcity\b/i.test(sig), value: profile.ville },
  ];

  let filled = 0;
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="tel"], input:not([type]), textarea'
  );
  inputs.forEach((el) => {
    if (el.value || el.offsetParent === null || el.disabled || el.readOnly) return;
    const sig = signatureOf(el);
    for (const rule of rules) {
      if (rule.test(sig, el) && setValue(el, rule.value)) {
        filled++;
        break;
      }
    }
  });

  return filled;
}

async function render() {
  const { cvento_token: token, cvento_api_base: apiBase } = await getStorage();

  if (!token) {
    app.innerHTML = `
      <p class="muted">Connectez votre compte CVento pour remplir automatiquement vos candidatures.</p>
      <input type="password" id="tokenInput" placeholder="Collez votre jeton CVento" />
      <input type="text" id="apiBaseInput" placeholder="URL CVento (avancé, optionnel)" value="${apiBase || ""}" />
      <button id="connectBtn">Se connecter</button>
      <div id="errorBox"></div>
      <p class="muted" style="margin-top:10px">
        Créez un jeton dans <a href="${DEFAULT_API_BASE}/dashboard/parametres" target="_blank">CVento &gt; Paramètres</a>.
        Laissez le champ URL vide sauf pour tester en local (ex : http://localhost:3000).
      </p>
    `;
    document.getElementById("connectBtn").addEventListener("click", async () => {
      const value = document.getElementById("tokenInput").value.trim();
      const base = document.getElementById("apiBaseInput").value.trim() || DEFAULT_API_BASE;
      if (!value) return;
      try {
        await fetchProfile(base, value);
        await setStorage({ cvento_token: value, cvento_api_base: base });
        render();
      } catch (err) {
        document.getElementById("errorBox").innerHTML = `<p class="error">${err.message}</p>`;
      }
    });
    return;
  }

  app.innerHTML = `<p class="muted">Chargement du profil...</p>`;
  try {
    const profile = await fetchProfile(apiBase || DEFAULT_API_BASE, token);
    app.innerHTML = `
      <div class="profile-card">
        <p class="name">${profile.fullName || profile.email}</p>
        ${profile.titre ? `<p class="detail">${profile.titre}</p>` : ""}
        <p class="detail">${profile.email}</p>
      </div>
      <button id="fillBtn">Remplir ce formulaire</button>
      <button id="disconnectBtn" class="secondary">Se déconnecter</button>
      <p id="status" class="status"></p>
    `;

    document.getElementById("fillBtn").addEventListener("click", async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) return;
      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: cventoFillForm,
        args: [profile],
      });
      const statusEl = document.getElementById("status");
      statusEl.textContent = result > 0 ? `${result} champ(s) rempli(s).` : "Aucun champ reconnu sur cette page.";
      statusEl.className = result > 0 ? "status success" : "status";
    });

    document.getElementById("disconnectBtn").addEventListener("click", async () => {
      await chrome.storage.local.remove(["cvento_token"]);
      render();
    });
  } catch (err) {
    app.innerHTML = `<p class="error">${err.message}</p><button id="resetBtn">Reconnecter</button>`;
    document.getElementById("resetBtn").addEventListener("click", async () => {
      await chrome.storage.local.remove(["cvento_token"]);
      render();
    });
  }
}

render();
