const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!DOCTYPE html>
<html>
<head>
<style>
html { overflow-x: clip; margin: 0; padding: 0; }
body { overflow: visible; margin: 0; padding: 0; min-height: 500vh; }
.stage { position: relative; height: 350vh; background: red; }
.sticky { position: sticky; top: 0; height: 100vh; background: blue; }
</style>
</head>
<body>
<div style="height: 100vh; background: yellow;">Hero</div>
<div class="stage" id="stage">
  <div class="sticky" id="sticky">Sticky Viewport</div>
</div>
<script>
window.scrollTo(0, 1500);
setTimeout(() => {
  const rect = document.getElementById('sticky').getBoundingClientRect();
  console.log('CLIENT_STICKY_TOP: ' + rect.top);
  document.title = 'STICKY_TOP_' + Math.round(rect.top);
}, 200);
</script>
</body>
</html>`);
});

server.listen(8999, () => {
  exec('"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --headless --dump-dom http://localhost:8999', (err, stdout, stderr) => {
    console.log('STDOUT:\n', stdout);
    server.close();
  });
});
