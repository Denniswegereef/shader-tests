#define PI 3.141592653589

varying vec2 v_uv;
varying vec3 v_position;
uniform float u_time;
uniform float u_duration;

uniform sampler2D u_tex;

vec2 rotate(vec2 pt, float theta, float aspect) {
  float c = cos(theta);
  float s = sin(theta);
  mat2 mat = mat2(c, s, -s, c);
  pt.y /= aspect;
  pt = mat * pt;
  pt.y *= aspect;
  return pt;
}

float inRect(vec2 pt, vec2 bottomLeft, vec2 topRight) {
  vec2 s = step(bottomLeft, pt) - step(topRight, pt);
  return s.x * s.y;
}

void main (void) {
  vec2 p = v_position.xy;
  float len = length(p);
  vec2 ripple = v_uv + p / len * 0.03 * cos(len * 12.0 - u_time * 9.0);
  float delta = (sin(mod(u_time, u_duration) * (2.0 * PI / u_duration)) + 1.0) / 2.0;
  vec2 uv = mix(ripple, v_uv, delta);
  vec3 color = texture2D(u_tex, uv).rgb;

  gl_FragColor = vec4(color, 1.0);
  // gl_FragColor = vec4(color.r, color.g * cos(u_time * 0.3) + 1.0, color.b * sin(u_time * 0.5) + 1.0 * 0.5, 1.0);
}
