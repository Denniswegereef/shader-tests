uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  vec3 first = vec3(1.0, 0.0, 1.0);
  vec3 second = vec3((sin(u_time) + 1.0) / 2.0, 1.0, 1.0);

  vec3 mixed = mix(first, second, uv.x);
  gl_FragColor = vec4(mixed, 1.0);
}