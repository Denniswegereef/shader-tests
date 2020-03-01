uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main(){
  vec2 color = u_mouse / u_resolution;
  gl_FragColor = vec4(color.x, color.y, (sin(u_time * 1.5) + 1.0)/ 2.0, 1.0);
}
