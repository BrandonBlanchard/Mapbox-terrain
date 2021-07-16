export const mapTileVS =  `
  uniform sampler2D colorMap;
  uniform sampler2D heightMap;

  #include <common>
  #include <uv_pars_vertex>
  #include <envmap_pars_vertex>
  #include <color_pars_vertex>
  #include <fog_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>

  void main() 
  {  
    #include <uv_vertex>
    #include <color_vertex>

    #include <begin_vertex>
	  #include <morphtarget_vertex>
  	#include <skinning_vertex>
	  #include <project_vertex>
	  #include <logdepthbuf_vertex>
	  #include <clipping_planes_vertex>
	  #include <worldpos_vertex>
	  #include <envmap_vertex>
	  #include <fog_vertex>

    vec4 texelHeight = texture2D(heightMap, vUv);
    // Convvert from: 0.0-1.0 to 0-255
    vec3 texelHeightRGB = vec3(texelHeight.r * 255.0, texelHeight.g * 255.0, texelHeight.b * 255.0);
    float rawHeight = -10000.0 + ((texelHeightRGB.x * 256.0 * 256.0 + texelHeightRGB.y * 256.0 + texelHeightRGB.z) * 0.1);
    // 8840 highest elevation + offset for 10000
    float adjustedHeight = (rawHeight + 10000.0) / 18840.0;

    vec3 basePosition = vec3(position.x, adjustedHeight * 124.0, position.z);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(basePosition, 1.0);
  }
  
`;