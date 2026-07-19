/** Fetch and save a same-origin asset (avoids stale cache / SW HTML responses). */
export async function downloadAsset(url, filename) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Download failed (${response.status})`);
  }

  const blob = await response.blob();
  const header = await blob.slice(0, 5).text();
  if (header !== '%PDF-') {
    throw new Error('Invalid PDF');
  }

  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

export function createAssetDownloadHandler(url, filename) {
  return async (event) => {
    event.preventDefault();
    try {
      await downloadAsset(url, filename);
    } catch {
      window.location.assign(url);
    }
  };
}
