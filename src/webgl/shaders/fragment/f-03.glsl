uniform vec2 u_resolution;
uniform float u_time;

varying vec3 vPosition;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);

  color.r = smoothstep(0.8, 0.5, vPosition.x);
  color.g = clamp(vPosition.y, 0.0, 1.0);
  color.b = step(((cos(u_time * clamp((u_time * 0.2), 1.0, 5.0)) + 1.0)/ 2.0), vPosition.x * 2.0);

  gl_FragColor = vec4(color, 0.0);
}

