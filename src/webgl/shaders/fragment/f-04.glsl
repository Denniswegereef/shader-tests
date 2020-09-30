uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color_a;
uniform vec3 u_color_b;

varying vec2 v_uv;

// 2D Random
float random (vec2 st) {
  return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    // Scale the coordinate system to see
    // some noise in action
    vec2 pos = vec2(v_uv.x * 1.4 + 0.01, v_uv.y - u_time * 0.25);

    // Use the noise function
    float n = noise(pos * 2.0);
    pos = vec2(v_uv.x * 75.0, v_uv.y * 2.0 - u_time * 0.25);

    n += noise(pos * 4.0);
    pos = vec2(v_uv.x * 75.0, v_uv.y * 3.0 - u_time * 0.25);

    n += noise(pos * 9.0);
    n /= 3.0;
    // n = smoothstep(0.4, 0.6, n)

    vec3 color = mix(u_color_a, u_color_b, n);

    gl_FragColor = vec4(color, 1.0);
}