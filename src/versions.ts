import { base } from "./catalog";
import "./versions.css";
import releases from "../public/package-versions.json";

// Version families share a frozen runtime, examples and downloads.
// Register releases in public/package-versions.json after generating their snapshots.
export const documentationVersions = releases;
export type VersionFamily = keyof typeof documentationVersions;

export function versionURL(
  family: VersionFamily,
  version: string,
  page: string,
) {
  const release = documentationVersions[family];
  return `${base}versions/${release.folder}${version}/${page}`;
}

export async function mountDocumentationVersion(
  family: VersionFamily,
  page: string,
) {
  const host = document.querySelector<HTMLElement>(
    "[data-documentation-version]",
  );
  if (!host || host.childElementCount) return;
  const release = documentationVersions[family];
  const archived =
    document.body.dataset.uploadVersion ?? document.body.dataset.dateVersion;
  const current = archived ?? release.versions[0];
  const label = document.createElement("label");
  label.textContent = "Documentation version";
  const select = document.createElement("select");
  select.setAttribute("aria-label", "Documentation version");
  function populate(available: string[]) {
    const versions = available.includes(current)
      ? available
      : [current, ...available];
    select.replaceChildren(
      ...versions.map((version) => {
        const option = document.createElement("option");
        option.value = version;
        option.textContent = `v${version}`;
        option.selected = version === current;
        return option;
      }),
    );
  }
  populate(release.versions);
  label.append(select);
  const link = document.createElement("a");
  link.href =
    (archived ? `${base}${page}` : versionURL(family, current, page)) +
    location.search +
    location.hash;
  link.textContent = archived ? "Latest documentation" : "Version permalink";
  host.append(label, link);
  select.addEventListener("change", () => {
    location.assign(
      versionURL(family, select.value, page) + location.search + location.hash,
    );
  });
  // Refresh navigation independently of the immutable page and its selected version.
  try {
    const response = await fetch(`${base}package-versions.json`, {
      cache: "no-cache",
    });
    if (!response.ok || !host.isConnected) return;
    const catalog = (await response.json()) as typeof releases;
    const available = catalog[family];
    if (
      available?.folder === release.folder &&
      Array.isArray(available.versions) &&
      available.versions.length &&
      available.versions.every((version) => /^\d+\.\d+\.\d+$/.test(version))
    )
      populate(available.versions);
  } catch {
    /* The bundled catalog keeps version navigation available offline. */
  }
}
