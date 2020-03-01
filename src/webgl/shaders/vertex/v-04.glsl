varying float distFromCenter;
varying vec3 vNormal;
uniform float u_time;

void main(){
  vNormal = normal;

  distFromCenter = length(position.xyz);
  vec3 offset = position;
  float dist = sin(u_time) * 0.5 + 0.5;

  offset.xyz += normal * dist;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( offset, 1.0 );
}
