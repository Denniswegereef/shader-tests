uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Varying the vertex uv from the vertex shader
varying vec2 v_uv;

// hotspot
void main(void) {
  vec2 uv = gl_FragCoord.xy / u_resolution;

	float intensity = 0.7; // Bright effect
	vec2 offset = vec2(-1.0 + u_mouse.x * -1.0 , -1.0 + u_mouse.y); // x / y offset
	vec3 light_color = vec3(1, 0.8, 0.6); // RGB, proportional values, higher increases intensity
	float master_scale = 0.2 + 0.02*sin(u_time); // Change the size of the effect
	float c = pow(master_scale/(length(uv+offset)), -0.3 * sin(u_time) + intensity);

	gl_FragColor = vec4(vec3(c) * light_color, 65.0);
}
