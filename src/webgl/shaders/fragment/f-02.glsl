uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 color = u_mouse / u_resolution;

  // Create vec3 of mouse cordinate and the time
  vec3 first = vec3(color.x, color.y, (sin(u_time) + 1.0)/ 2.0);
  vec3 second = vec3(color.y, color.x, (sin(u_time) + 1.0)/ 2.0);

  // Mix the vec3 bases of the y position of the screen
  vec3 mixed = mix(first, second, uv.y);
  gl_FragColor = vec4(mixed, 1.0);
}