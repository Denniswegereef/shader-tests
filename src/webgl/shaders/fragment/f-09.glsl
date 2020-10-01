#define PI 3.141592653589

varying vec2 v_uv;
varying vec3 v_position;
uniform float u_time;

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
  vec2 center = vec2(0.5);
  vec2 uv = rotate(v_uv - center, u_time, 0.8225 / 0.6275) + center;

  vec3 texel = texture2D(u_tex, uv).rgb;
  vec3 bg = vec3(0.0);
  float t = inRect(uv, vec2(0.0), vec2(1.0));
  vec3 color = mix(bg, texel, t);
  gl_FragColor = vec4(color, 1.0);
  // gl_FragColor = vec4(color.r, color.g * cos(u_time * 0.3) + 1.0, color.b * sin(u_time * 0.5) + 1.0 * 0.5, 1.0);
}
