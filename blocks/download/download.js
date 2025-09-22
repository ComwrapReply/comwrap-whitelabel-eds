export default function decorate(block) {
  const rows = block.children || [];
  let downloadLink;
  if (rows[3]) {
    const img = rows[3].querySelector('img');
    const anchor = rows[3].querySelector('a');
    downloadLink = img?.src || anchor?.href;
  }
  const downloadData = {
    title: rows[0]?.textContent,
    description: rows[1]?.innerHTML,
    buttonLabel: rows[2]?.textContent,
    downloadLink,
  };

  // Set block class
  block.className = 'download-wrapper-inner';

  // Clear existing content
  block.innerHTML = '';

  // Create title
  if (downloadData.title) {
    const title = document.createElement('h2');
    title.className = 'download-title';
    title.textContent = downloadData.title;
    block.appendChild(title);
  }

  // Create description
  if (downloadData.description) {
    const description = document.createElement('div');
    description.className = 'download-description';
    description.innerHTML = downloadData.description;
    block.appendChild(description);
  }

  // Create file info section
  if (downloadData.downloadLink) {
    const fileInfo = document.createElement('div');
    fileInfo.className = 'download-file-info';

    // Extract filename from URL
    const fileName = downloadData.downloadLink.split('/').pop();
    const fileNameSpan = document.createElement('span');
    fileNameSpan.className = 'download-file-name';
    fileNameSpan.textContent = fileName;
    fileInfo.appendChild(fileNameSpan);

    // Add file size info
    const fileSizeSpan = document.createElement('span');
    fileSizeSpan.className = 'download-file-size';
    fileInfo.appendChild(fileSizeSpan);

    // Fetch and display file size
    fetch(downloadData.downloadLink, { method: 'HEAD' })
      .then((response) => {
        const size = response.headers.get('content-length');
        if (size) {
          const sizeInMB = size / (1024 * 1024);
          const sizeInKB = size / 1024;
          fileSizeSpan.textContent = sizeInMB >= 1
            ? `(${sizeInMB.toFixed(2)} MB)`
            : `(${sizeInKB.toFixed(2)} KB)`;
        }
      })
      .catch(() => {
        fileSizeSpan.style.display = 'none';
      });

    block.appendChild(fileInfo);
  }

  // Create download button
  if (downloadData.downloadLink && downloadData.buttonLabel) {
    const button = document.createElement('a');
    button.className = 'download-button';
    button.href = downloadData.downloadLink;
    button.setAttribute('download', '');
    button.setAttribute('role', 'button');
    button.setAttribute('aria-label', `Download ${downloadData.buttonLabel}`);
    const buttonText = document.createElement('span');
    buttonText.textContent = downloadData.buttonLabel;
    button.appendChild(buttonText);

    // Add download icon
    const icon = document.createElement('span');
    icon.className = 'download-icon';
    icon.setAttribute('aria-hidden', 'true');
    button.appendChild(icon);

    block.appendChild(button);
  }
}
