export const mapTileFS = `
uniform sampler2D colorMap;
uniform sampler2D heightMap;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {;
	// Swatch samples
	vec4 color = texture2D(colorMap, vUv);
	vec4 diffuseColor = vec4(color.xyz, 1.0);

	vec4 texelHeight = texture2D(heightMap, vUv);
	vec3 texelHeightRGB = vec3(texelHeight.r * 255.0, texelHeight.g * 255.0, texelHeight.b * 255.0);
	float rawHeight = -10000.0 + ((texelHeightRGB.x * 256.0 * 256.0 + texelHeightRGB.y * 256.0 + texelHeightRGB.z) * 0.1);
	// 8840 highest elevation + offset for 10000
	float adjustedHeight = (rawHeight + 10000.0) / 18840.0;

	vec3 mapColor =  mix(vec3(0.1098, 0.2, 0.149), vec3(0.949, 0.6196, 0.667), smoothstep(0.5, 0.7, adjustedHeight));
	mapColor = mix(diffuseColor.xyz, mapColor, 0.9);

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	
	// modulation
	#include <aomap_fragment>
	
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	
	#include <envmap_fragment>

	gl_FragColor = vec4(vec3(mapColor), 1.0);
	// gl_FragColor = vec4(diffuseColor.xyz, 1.0);
	
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}


`;
