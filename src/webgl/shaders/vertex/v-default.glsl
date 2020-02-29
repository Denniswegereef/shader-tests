void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 0.9, 1.0);
}
