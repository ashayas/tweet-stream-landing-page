import * as THREE from "three";
const C = {
  blue: 0x168bd8,
  ice: 0xc4eafa,
  red: 0xee716f,
  navy: 0x123452,
  lime: 0xd5f85c,
};
export function createArena() {
  const group = new THREE.Group();
  group.name = "tweet.stream • Open Ice Arena";
  const material = (color, extra = {}) =>
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.45,
      metalness: 0.12,
      ...extra,
    });
  const navy = material(C.navy),
    white = material(0xe2f5ff),
    red = material(C.red),
    blue = material(C.blue),
    lime = material(C.lime, { emissive: C.lime, emissiveIntensity: 0.18 });
  function mesh(geometry, mat, name, x = 0, y = 0, z = 0) {
    const m = new THREE.Mesh(geometry, mat);
    m.name = name;
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
    return m;
  }
  function rounded(w, h, r) {
    const s = new THREE.Shape();
    s.moveTo(-w / 2 + r, -h / 2);
    s.lineTo(w / 2 - r, -h / 2);
    s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    s.lineTo(w / 2, h / 2 - r);
    s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    s.lineTo(-w / 2 + r, h / 2);
    s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    s.lineTo(-w / 2, -h / 2 + r);
    s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    return s;
  }
  function slab(w, h, r, depth, mat, y, name) {
    const g = new THREE.ExtrudeGeometry(rounded(w, h, r), {
      depth,
      bevelEnabled: true,
      bevelSize: 0.06,
      bevelThickness: 0.04,
      bevelSegments: 2,
      steps: 1,
      curveSegments: 20,
    });
    g.rotateX(-Math.PI / 2);
    return mesh(g, mat, name, 0, y, 0);
  }
  slab(13.5, 7.9, 1.6, 0.35, navy, -0.6, "Sculpted navy plinth");
  slab(13.2, 7.6, 1.5, 0.11, blue, -0.24, "Electric blue plinth reveal");
  slab(13, 7.4, 1.5, 0.16, white, -0.12, "Rink board base");
  const boardShape = rounded(12.95, 7.35, 1.55);
  const hole = rounded(12.5, 6.9, 1.35);
  boardShape.holes.push(new THREE.Path(hole.getPoints(90).reverse()));
  const boardsGeo = new THREE.ExtrudeGeometry(boardShape, {
    depth: 0.43,
    bevelEnabled: false,
    curveSegments: 24,
  });
  boardsGeo.rotateX(-Math.PI / 2);
  mesh(boardsGeo, white, "Continuous dasher boards", 0, 0.07, 0);
  const topGeo = new THREE.ExtrudeGeometry(boardShape, {
    depth: 0.055,
    bevelEnabled: false,
    curveSegments: 24,
  });
  topGeo.rotateX(-Math.PI / 2);
  mesh(topGeo, blue, "Blue rail cap", 0, 0.51, 0);
  const iceCanvas = document.createElement("canvas");
  iceCanvas.width = 2048;
  iceCanvas.height = 1024;
  const ctx = iceCanvas.getContext("2d");
  const W = 2048,
    H = 1024;
  ctx.fillStyle = "#cbeafb";
  ctx.fillRect(0, 0, W, H);
  const gradient = ctx.createLinearGradient(0, 0, W, H);
  gradient.addColorStop(0, "#e8f7ff");
  gradient.addColorStop(1, "#a9d9ef");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);
  // Seeded ice scratches: reproducible and no external textures.
  let seed = 71;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  ctx.strokeStyle = "#ffffff22";
  ctx.lineWidth = 1;
  for (let i = 0; i < 1600; i++) {
    const x = random() * W,
      y = random() * H;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + random() * 200 - 100, y + random() * 70 - 35);
    ctx.stroke();
  }
  const px = (x) => (x / 12.5 + 0.5) * W,
    pz = (z) => (z / 6.9 + 0.5) * H;
  function line(x, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(px(x), 0);
    ctx.lineTo(px(x), H);
    ctx.stroke();
  }
  line(-2, "#398bd0", 15);
  line(2, "#398bd0", 15);
  line(0, "#e67d81", 7);
  line(-5.1, "#e67d81", 5);
  line(5.1, "#e67d81", 5);
  function circle(x, z, r, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.ellipse(px(x), pz(z), (r / 12.5) * W, (r / 6.9) * H, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  circle(0, 0, 1.03, "#4d98c8", 5);
  for (const x of [-3.8, 3.8])
    for (const z of [-1.8, 1.8]) {
      circle(x, z, 0.81, "#d27f88", 4);
      circle(x, z, 0.06, "#d27f88", 6);
      for (const offset of [-0.15, 0.15]) {
        ctx.fillStyle = "#d27f88";
        ctx.fillRect(px(x - 0.2), pz(z + offset), W * 0.032, 3);
      }
    }
  for (const x of [-5.05, 5.05]) {
    ctx.fillStyle = "#64bae34d";
    ctx.beginPath();
    ctx.ellipse(
      px(x),
      pz(0),
      (0.65 / 12.5) * W,
      (1 / 6.9) * H,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    circle(x, 0, 0.7, "#e38b90", 3);
  }
  ctx.save();
  ctx.translate(px(0), pz(0));
  ctx.fillStyle = "#238bc2";
  ctx.beginPath();
  for (const [x, y] of [
    [-66, 13],
    [-80, -32],
    [-12, -10],
    [-45, -75],
    [45, -22],
    [76, -40],
    [99, -33],
    [106, -10],
    [126, 0],
    [99, 16],
    [84, 51],
    [32, 68],
    [-38, 57],
    [-65, 49],
    [-26, 31],
  ])
    ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#cbeafb";
  ctx.beginPath();
  ctx.moveTo(-2, 18);
  ctx.lineTo(51, 16);
  ctx.lineTo(18, 42);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(83, -15, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.fillStyle = "#377da44d";
  ctx.font = "600 34px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("OPEN SOURCE. OPEN ICE.", W / 2, 95);
  ctx.font = "600 28px sans-serif";
  ctx.fillText("T W E E T . S T R E A M", W / 2, H - 75);
  ctx.restore();
  const texture = new THREE.CanvasTexture(iceCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const iceGeo = new THREE.ShapeGeometry(rounded(12.5, 6.9, 1.35), 48);
  const pos = iceGeo.attributes.position;
  const uv = iceGeo.attributes.uv;
  for (let i = 0; i < pos.count; i++)
    uv.setXY(i, pos.getX(i) / 12.5 + 0.5, pos.getY(i) / 6.9 + 0.5);
  iceGeo.rotateX(-Math.PI / 2);
  mesh(
    iceGeo,
    material(0xffffff, { map: texture, roughness: 0.26, metalness: 0.12 }),
    "Etched ice surface",
    0,
    0.085,
    0,
  );
  // Transparent safety glass, with visible thin uprights around the rear of the rink.
  const glass = material(0x7ec8ef, {
    transparent: true,
    opacity: 0.1,
    roughness: 0.15,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  for (let i = -5; i <= 5; i++) {
    mesh(
      new THREE.BoxGeometry(0.035, 1.1, 0.035),
      material(0x77b3d6, { metalness: 0.5 }),
      "Glass upright",
      i,
      0.99,
      -3.53,
    );
    if (i < 5)
      mesh(
        new THREE.PlaneGeometry(0.96, 1.03),
        glass,
        "Safety glass",
        i + 0.5,
        1,
        -3.53,
      );
  }
  // Low rink-side seats and graphic LED rails, kept light enough for mobile.
  for (const z of [-4.3, 4.3]) {
    for (let row = 0; row < 2; row++) {
      const zz = z + Math.sign(z) * row * 0.31;
      mesh(
        new THREE.BoxGeometry(10.8, 0.22, 0.26),
        navy,
        "Bleacher tier",
        0,
        -0.13 + row * 0.2,
        zz,
      );
      for (let x = -5; x <= 5; x += 0.45)
        mesh(
          new THREE.BoxGeometry(0.3, 0.12, 0.21),
          material(row ? 0x28638a : 0x3382af),
          "Individual rink seat",
          x,
          0.05 + row * 0.2,
          zz,
        );
    }
    mesh(
      new THREE.BoxGeometry(11.3, 0.055, 0.065),
      lime,
      "Lime perimeter light",
      0,
      -0.2,
      z + Math.sign(z) * 0.7,
    );
  }
  function tube(a, b, r, mat, name) {
    const start = new THREE.Vector3(...a),
      end = new THREE.Vector3(...b),
      diff = end.clone().sub(start);
    const obj = mesh(
      new THREE.CylinderGeometry(r, r, diff.length(), 8),
      mat,
      name,
    );
    obj.position.copy(start.add(end).multiplyScalar(0.5));
    obj.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      diff.normalize(),
    );
    return obj;
  }
  for (const sign of [-1, 1]) {
    const x = sign * 5.1,
      back = x + sign * 0.66;
    tube([x, 0.13, -0.88], [x, 0.95, -0.88], 0.045, red, "Goal post");
    tube([x, 0.13, 0.88], [x, 0.95, 0.88], 0.045, red, "Goal post");
    tube([x, 0.95, -0.88], [x, 0.95, 0.88], 0.045, red, "Goal crossbar");
    tube([back, 0.13, -0.78], [back, 0.74, -0.78], 0.03, red, "Back post");
    tube([back, 0.13, 0.78], [back, 0.74, 0.78], 0.03, red, "Back post");
    tube([back, 0.74, -0.78], [back, 0.74, 0.78], 0.03, red, "Back crossbar");
    for (const z of [-0.88, 0.88])
      tube([x, 0.95, z], [back, 0.74, z * 0.89], 0.025, red, "Goal roof frame");
    const netMat = new THREE.LineBasicMaterial({
      color: 0xd5edfa,
      transparent: true,
      opacity: 0.65,
    });
    const pts = [];
    for (let z = -0.78; z <= 0.79; z += 0.13)
      pts.push(
        new THREE.Vector3(back, 0.14, z),
        new THREE.Vector3(back, 0.73, z),
      );
    for (let y = 0.15; y <= 0.75; y += 0.12)
      pts.push(
        new THREE.Vector3(back, y, -0.78),
        new THREE.Vector3(back, y, 0.78),
      );
    for (const side of [-1, 1])
      for (let y = 0.15; y <= 0.75; y += 0.12)
        pts.push(
          new THREE.Vector3(back, y, side * 0.78),
          new THREE.Vector3(x, y, side * 0.88),
        );
    for (let z = -0.78; z <= 0.79; z += 0.13)
      pts.push(
        new THREE.Vector3(back, 0.74, z),
        new THREE.Vector3(x, 0.95, z / 0.89),
      );
    const net = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(pts),
      netMat,
    );
    net.name = "Woven goal net";
    group.add(net);
  }
  // A tiny graphic scoreboard on the far side: an arena detail, not a product claim.
  const label = document.createElement("canvas");
  label.width = 1024;
  label.height = 320;
  const lc = label.getContext("2d");
  lc.fillStyle = "#112b44";
  lc.fillRect(0, 0, 1024, 320);
  lc.strokeStyle = "#55bafa";
  lc.lineWidth = 8;
  lc.strokeRect(8, 8, 1008, 304);
  lc.fillStyle = "#d5f85c";
  lc.font = "bold 50px sans-serif";
  lc.textAlign = "center";
  lc.fillText("OPEN ICE CLUB", 512, 88);
  lc.fillStyle = "#e5f2ff";
  lc.font = "bold 110px monospace";
  lc.fillText("06 : 00", 512, 210);
  lc.fillStyle = "#79a9c9";
  lc.font = "23px monospace";
  lc.fillText("SIX TOOLS     ZERO BLACK BOXES", 512, 276);
  const scoreTex = new THREE.CanvasTexture(label);
  scoreTex.colorSpace = THREE.SRGBColorSpace;
  const scoreboard = mesh(
    new THREE.BoxGeometry(3.6, 1.18, 0.15),
    navy,
    "Arena scoreboard",
    0,
    1.6,
    -4.2,
  );
  mesh(
    new THREE.PlaneGeometry(3.5, 1.1),
    new THREE.MeshBasicMaterial({ map: scoreTex }),
    "Scoreboard face",
    0,
    1.6,
    -4.11,
  );
  for (const x of [-1.3, 1.3])
    mesh(
      new THREE.BoxGeometry(0.08, 1.3, 0.08),
      navy,
      "Scoreboard leg",
      x,
      0.4,
      -4.2,
    );
  return group;
}
