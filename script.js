function formatMultiline(text) {
  return text
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => `<p>${line}</p>`)
    .join('');
}

document.querySelectorAll('[data-target]').forEach(input => {
  input.addEventListener('input', () => {
    const targetId = input.dataset.target;
    const previewElement = document.getElementById(targetId);
    if (!previewElement) return;

    if (['preview-profile', 'preview-experience', 'preview-education', 'preview-certifications'].includes(targetId)) {
      previewElement.innerHTML = formatMultiline(input.value);
    } else {
      previewElement.textContent = input.value;
    }
  });
});

document.getElementById('photoUpload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('preview-photo').src = e.target.result;
  };
  if (file) reader.readAsDataURL(file);
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const element = document.getElementById('resume');
  const opt = {
    margin: [0, 0, 0, 0],
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
      backgroundColor: null
    },
    jsPDF: {
      unit: 'pt',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };
  html2pdf().set(opt).from(element).save();
});

document.getElementById('themeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});

document.getElementById('templateSwitcher').addEventListener('change', (e) => {
  const resume = document.getElementById('resume');
  resume.className = 'resume ' + e.target.value;
});

$(function () {
  $('#sortable-sections').sortable({
    handle: 'h3',
    placeholder: 'sortable-placeholder',
    tolerance: 'pointer',
    items: '> .section'
  });
});
