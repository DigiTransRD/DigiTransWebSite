<template>
  <footer class="footer">
    <div class="footer__brand">
      <div class="brand-title">ABI Assistant</div>
      <p class="tagline">商用人工智慧助理 - 您的智慧轉型夥伴</p>
      <div class="contact">
        <a href="mailto:digitrans.tw@gmail.com">digitrans.tw@gmail.com</a>
      </div>
      <div class="copy">© 2026 Digital Transformation Consulting Ltd.</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0f172a;
  color: #e2e8f0;
  padding: 32px 20px 40px;
}

.footer__brand {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  display: grid;
  gap: 10px;
}

.brand-title {
  font-size: 22px;
  font-weight: 800;
}

.tagline {
  margin: 0;
  color: #cbd5e1;
}

.contact {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.contact a {
  color: #cbd5e1;
  text-decoration: none;
}

.contact a:hover {
  color: #fff;
}

.copy {
  color: #94a3b8;
  font-size: 13px;
}
</style>
