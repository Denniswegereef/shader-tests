uniform vec2 u_resolution;
uniform float u_time;

varying vec3 vNormal;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  gl_FragColor = vec4(clamp(vNormal.y, 0.1, 0.9), clamp(sin(u_time * 0.5) * 2.0 + 1.0, 0.5, 0.8), u_time, 1.0);
}