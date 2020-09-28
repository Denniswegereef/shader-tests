uniform float u_time;
uniform float u_scale;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_colors;
uniform float u_grow;
uniform float u_intensity;
uniform float u_bounce;

// Varying the vertex uv from the vertex shader
varying vec2 v_uv;

// hotspot
void main(void) {
  vec2 uv = gl_FragCoord.xy / u_resolution;

	float intensity = u_intensity; // Bright effect
	vec2 offset = vec2(clamp(-1.0 + u_mouse.x * -1.0, 1.5, -1.5), clamp(-1.0 + u_mouse.y, -1.5, 1.5)); // x / y offset
	vec3 light_color = vec3(u_colors.r, u_colors.g, u_colors.b); // RGB, proportional values, higher increases intensity
	float master_scale = u_scale + u_bounce; // Change the size of the effect
	float c = pow(master_scale/(length(uv + offset)), u_grow + intensity);

	gl_FragColor = vec4(vec3(c) * light_color, 2.0);
}
