(() => {
  const stage = document.querySelector('.hero-network-stage');
  const hero = document.querySelector('.hero-business-network');
  const canvas = stage.querySelector('.hero-network-canvas');
  const context = canvas.getContext('2d');
  const charts = [...stage.querySelectorAll('.hero-chart')];
  const travelers = charts.map(chart => chart.querySelector('.hero-chart-traveler'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const chartTravelTiming = { hold: 3.2, inbound: 5, center: .7, outbound: 5, stagger: .55, settle: 2.2 };
  const chartCycleDuration = chartTravelTiming.hold + chartTravelTiming.inbound + chartTravelTiming.center
    + chartTravelTiming.outbound + chartTravelTiming.stagger * (charts.length - 1) + chartTravelTiming.settle;
  let stageWidth = 0;
  let stageHeight = 0;
  let networkPaths = [];
  let chartPaths = [];
  let chartAnchors = [];
  let currentChartRoutes = charts.map((chart, index) => index);
  let outgoingChartRoutes = selectAlternateChartRoutes(currentChartRoutes);
  let chartCycleStartTime = 0;
  let junctions = [];
  let animationFrame = null;
  let previousTime = 0;
  let networkTime = 0;
  let visible = true;

  function selectAlternateChartRoutes(currentRoutes) {
    const directionOffset = 1 + Math.floor(Math.random() * (currentRoutes.length - 1));
    return currentRoutes.map(route => (route + directionOffset) % currentRoutes.length);
  }

  function curvePoint(path, progress) {
    const remaining = 1 - progress;
    const startWeight = remaining ** 3;
    const firstWeight = 3 * remaining ** 2 * progress;
    const secondWeight = 3 * remaining * progress ** 2;
    const endWeight = progress ** 3;
    return {
      x: startWeight * path.start.x + firstWeight * path.first.x + secondWeight * path.second.x + endWeight * path.end.x,
      y: startWeight * path.start.y + firstWeight * path.first.y + secondWeight * path.second.y + endWeight * path.end.y,
    };
  }

  function neuralPath(start, end, bend, index, primary = false) {
    const distanceX = end.x - start.x;
    const distanceY = end.y - start.y;
    const distance = Math.hypot(distanceX, distanceY);
    const normalX = distance === 0 ? 0 : -distanceY / distance;
    const normalY = distance === 0 ? 0 : distanceX / distance;
    return {
      start,
      end,
      first: { x: start.x + distanceX * .3 + normalX * bend, y: start.y + distanceY * .3 + normalY * bend },
      second: { x: start.x + distanceX * .72 - normalX * bend * .35, y: start.y + distanceY * .72 - normalY * bend * .35 },
      duration: 3.5 + index % 5 * .65,
      phase: index * .173,
      primary,
    };
  }

  function tracePath(path) {
    context.beginPath();
    context.moveTo(path.start.x, path.start.y);
    context.bezierCurveTo(path.first.x, path.first.y, path.second.x, path.second.y, path.end.x, path.end.y);
  }

  function buildNetwork() {
    const bounds = stage.getBoundingClientRect();
    chartAnchors = charts.map((chart, index) => {
      const chartBounds = chart.getBoundingClientRect();
      const traveler = travelers[index];
      return {
        x: chartBounds.left - bounds.left + traveler.offsetLeft + traveler.offsetWidth / 2,
        y: chartBounds.top - bounds.top + traveler.offsetTop + traveler.offsetHeight / 2,
      };
    });
    const compact = stageWidth < 500;
    const hub = { x: stageWidth * .54, y: stageHeight * (compact ? .43 : .45) };
    const fractionalJunctions = [
      [.19, .32], [.35, .21], [.52, .16], [.69, .21], [.87, .28],
      [.88, .53], [.77, .65], [.72, .85], [.42, .83], [.29, .7],
      [.17, .61], [.38, .51], [.64, .55], [.54, .65], [.47, .32],
    ];
    junctions = [hub, ...fractionalJunctions.map(([x, y]) => ({ x: x * stageWidth, y: y * stageHeight }))];
    chartPaths = chartAnchors.map((anchor, index) => neuralPath(hub, anchor, stageWidth * (.065 + index * .012), index, true));
    networkPaths = [...chartPaths];
    const branchPairs = [
      [0, 15], [15, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
      [8, 9], [9, 10], [10, 11], [11, 1], [1, 2], [2, 3],
      [0, 12], [12, 1], [12, 10], [0, 13], [13, 6], [13, 7],
      [0, 14], [14, 9], [14, 8], [15, 2], [15, 4],
    ];
    for (let index = 0; index < branchPairs.length; index++) {
      const [startIndex, endIndex] = branchPairs[index];
      networkPaths.push(neuralPath(junctions[startIndex], junctions[endIndex], stageWidth * (index % 2 === 0 ? .025 : -.04), index + 3));
    }
    chartAnchors.forEach((anchor, index) => {
      const junctionIndex = [12, 14, 5][index];
      networkPaths.push(neuralPath(junctions[junctionIndex], anchor, stageWidth * -.03, index + 30, true));
    });
  }

  function placeTravelingChart(index, route, progress, phase) {
    const point = curvePoint(chartPaths[route], progress);
    const origin = chartAnchors[index];
    const traveler = travelers[index];
    const scale = progress ** .8;
    traveler.style.transform = `translate(${point.x - origin.x}px, ${point.y - origin.y}px) scale(${scale})`;
    traveler.style.opacity = String(Math.min(1, progress / .18));
    if (traveler.dataset.travelPhase !== phase) traveler.dataset.travelPhase = phase;
    if (traveler.dataset.route !== String(route)) traveler.dataset.route = String(route);
  }

  function renderChartTravel(time) {
    while (time >= chartCycleStartTime + chartCycleDuration) {
      chartCycleStartTime += chartCycleDuration;
      currentChartRoutes = outgoingChartRoutes;
      outgoingChartRoutes = selectAlternateChartRoutes(currentChartRoutes);
    }
    const cycleTime = time - chartCycleStartTime;
    const inboundEnd = chartTravelTiming.hold + chartTravelTiming.inbound;
    const centerEnd = inboundEnd + chartTravelTiming.center;
    const outboundEnd = centerEnd + chartTravelTiming.outbound;
    for (let index = 0; index < charts.length; index++) {
      const phaseTime = cycleTime - index * chartTravelTiming.stagger;
      if (phaseTime < chartTravelTiming.hold) {
        placeTravelingChart(index, currentChartRoutes[index], 1, 'anchor');
      } else if (phaseTime < inboundEnd) {
        const fraction = (phaseTime - chartTravelTiming.hold) / chartTravelTiming.inbound;
        const eased = fraction * fraction * (3 - 2 * fraction);
        placeTravelingChart(index, currentChartRoutes[index], 1 - eased, 'inbound');
      } else if (phaseTime < centerEnd) {
        placeTravelingChart(index, currentChartRoutes[index], 0, 'center');
      } else if (phaseTime < outboundEnd) {
        const fraction = (phaseTime - centerEnd) / chartTravelTiming.outbound;
        const eased = fraction * fraction * (3 - 2 * fraction);
        placeTravelingChart(index, outgoingChartRoutes[index], eased, 'outbound');
      } else {
        placeTravelingChart(index, outgoingChartRoutes[index], 1, 'anchor');
      }
    }
  }

  function showChartsAtSceneAnchors() {
    travelers.forEach((traveler, index) => {
      traveler.style.transform = 'none';
      traveler.style.opacity = '1';
      traveler.dataset.travelPhase = 'static';
      traveler.dataset.route = String(index);
    });
  }

  function drawPulse(path, progress, intensity) {
    const start = Math.max(0, progress - .14);
    const tailPoint = curvePoint(path, start);
    context.beginPath();
    context.moveTo(tailPoint.x, tailPoint.y);
    for (let segment = 1; segment <= 14; segment++) {
      const point = curvePoint(path, start + (progress - start) * segment / 14);
      context.lineTo(point.x, point.y);
    }
    const head = curvePoint(path, progress);
    const trail = context.createLinearGradient(tailPoint.x, tailPoint.y, head.x, head.y);
    trail.addColorStop(0, 'rgba(90,166,255,0)');
    trail.addColorStop(1, `rgba(173,219,255,${intensity})`);
    context.strokeStyle = trail;
    context.lineWidth = path.primary ? 2 : 1.4;
    context.shadowColor = '#76b6ff';
    context.shadowBlur = path.primary ? 13 : 8;
    context.stroke();
    context.beginPath();
    context.fillStyle = `rgba(219,234,254,${intensity})`;
    context.arc(head.x, head.y, path.primary ? 2.4 : 1.65, 0, Math.PI * 2);
    context.fill();
  }

  function paintNetwork(time) {
    context.clearRect(0, 0, stageWidth, stageHeight);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    for (let index = 0; index < networkPaths.length; index++) {
      const path = networkPaths[index];
      const brightness = .32 + Math.sin(time * .75 + index * .55) * .095;
      tracePath(path);
      context.strokeStyle = `rgba(119,186,255,${path.primary ? brightness + .2 : brightness})`;
      context.lineWidth = path.primary ? 1.5 : .85;
      context.shadowColor = '#205bc3';
      context.shadowBlur = path.primary ? 13 : 5;
      context.stroke();
      const progress = (time / path.duration + path.phase) % 1;
      drawPulse(path, progress, path.primary ? .98 : .68);
      if (path.primary) drawPulse(path, (progress + .5) % 1, .75);
    }
    for (let index = 0; index < junctions.length; index++) {
      const point = junctions[index];
      const core = index === 0;
      const pulse = .58 + Math.sin(time * 1.2 + index * .8) * .23;
      const radius = core ? 5.5 : 2.1;
      context.beginPath();
      context.fillStyle = `rgba(160,209,255,${pulse})`;
      context.shadowColor = '#91c9ff';
      context.shadowBlur = core ? 28 : 12;
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fill();
      if (core) {
        context.beginPath();
        context.strokeStyle = `rgba(145,201,255,${pulse * .45})`;
        context.lineWidth = 1;
        context.arc(point.x, point.y, 13 + Math.sin(time * .7) * 2, 0, Math.PI * 2);
        context.stroke();
      }
    }
    context.shadowBlur = 0;
  }

  function animateNetwork(timestamp) {
    const elapsed = previousTime ? Math.min((timestamp - previousTime) / 1000, .05) : 0;
    previousTime = timestamp;
    networkTime += elapsed;
    paintNetwork(networkTime);
    renderChartTravel(networkTime);
    animationFrame = window.requestAnimationFrame(animateNetwork);
  }

  function synchronizeAnimation() {
    if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
    previousTime = 0;
    document.body.dataset.motion = reducedMotion.matches ? 'paused' : 'playing';
    if (reducedMotion.matches) {
      stage.dataset.networkState = 'static';
      paintNetwork(1.2);
      showChartsAtSceneAnchors();
    } else if (visible && !document.hidden) {
      stage.dataset.networkState = 'running';
      animationFrame = window.requestAnimationFrame(animateNetwork);
    } else {
      stage.dataset.networkState = 'sleeping';
    }
  }

  function resizeNetwork() {
    stageWidth = stage.clientWidth;
    stageHeight = stage.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(stageWidth * pixelRatio);
    canvas.height = Math.round(stageHeight * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    buildNetwork();
    paintNetwork(reducedMotion.matches ? 1.2 : networkTime);
    if (reducedMotion.matches) showChartsAtSceneAnchors();
    else renderChartTravel(networkTime);
  }

  new ResizeObserver(resizeNetwork).observe(stage);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    synchronizeAnimation();
  }, { threshold: 0 }).observe(hero);
  reducedMotion.addEventListener('change', synchronizeAnimation);
  document.addEventListener('visibilitychange', synchronizeAnimation);
  resizeNetwork();
  synchronizeAnimation();
})();
