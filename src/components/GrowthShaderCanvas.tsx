import React, { useEffect, useRef } from 'react';

export const GrowthShaderCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    let animFrameId: number;

    const syncSize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 500;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null;
    if (resizeObserver) {
      resizeObserver.observe(canvas);
    }
    syncSize();

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float line(vec2 p, vec2 a, vec2 b, float width) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return smoothstep(width, 0.0, length(pa - ba * h));
}

void main() {
    vec2 uv = v_texCoord;
    vec3 backgroundColor = vec3(0.976, 0.980, 1.0);
    vec3 primaryColor = vec3(0.0, 0.43, 0.1); // Vibrant green
    vec3 secondaryColor = vec3(0.0, 0.20, 0.38); // Trust navy

    float progress = mod(u_time * 0.2, 1.2);
    
    // Growth curve
    float curve = pow(uv.x, 2.0) * 0.7 + 0.1;
    
    // Draw line
    float lineMask = line(uv, vec2(0.0, 0.1), vec2(progress, pow(progress, 2.0) * 0.7 + 0.1), 0.012);
    
    // Area under curve
    float areaMask = step(uv.y, curve) * step(uv.x, progress);
    vec3 areaColor = mix(backgroundColor, primaryColor, 0.25);
    
    // Grid lines
    float grid = 0.0;
    grid += step(abs(mod(uv.x, 0.1)), 0.002);
    grid += step(abs(mod(uv.y, 0.1)), 0.002);
    vec3 finalColor = mix(backgroundColor, vec3(0.88, 0.91, 0.95), grid * 0.5);
    
    finalColor = mix(finalColor, areaColor, areaMask * 0.6);
    finalColor = mix(finalColor, primaryColor, lineMask);
    
    float point = smoothstep(0.02, 0.0, length(uv - vec2(0.5, pow(0.5, 2.0) * 0.7 + 0.1)));
    if (progress > 0.5) finalColor = mix(finalColor, secondaryColor, point);

    gl_FragColor = vec4(finalColor, 1.0);
}`;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    const render = (t: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block rounded-xl overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
};
