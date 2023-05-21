#ifdef GL_EXT_shader_texture_lod
#extension GL_EXT_shader_texture_lod : enable
#endif
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
#ifdef TRANSPARENT_BACK_COLOR
uniform vec4 uTransparentBackColor;
uniform float uTransparentBackColorTolerance;
#endif
#ifdef FINAL_RESOLUTION_CLIP
varying vec3 vertexClip;
uniform vec3 uMaxClip;
uniform vec3 uMinClip;
#endif
#ifdef TexCoord
uniform sampler2D uTexture;
#ifdef Map
uniform sampler2D uMapTexture;
#endif
varying vec4 vTexCoord;
varying vec2 vTexCoordZ;
#endif
#ifdef SEC_TEX_EMISSION
uniform vec3 uEmissionFactor;
#endif
#ifdef COMPUTE_TEXCOORD
#ifdef TextureBatch
uniform vec4 uTextureDim;
varying vec4 vTexTran;
varying vec4 vTexScale;
varying vec4 vTexSize;
varying vec2 vMaxMipLevel;
#else
varying vec4 vTexMatrix;
varying vec2 vIsRGBA;
#endif
#endif
#ifdef COMPUTE_W_VALUE
varying float wValue;
#endif
#ifdef MULTI_TEX
uniform sampler2D uSecTexture;
varying vec4 vTexMatrix2;
#endif
#ifdef USE_BatchPBR
varying vec4 vMetallicRoughness;
varying vec4 vEmissiveFactor;
varying vec3 vAlphaCutoffAndModeAndDoubleSide;
#endif
#ifdef OVERLAY
uniform sampler2D uOverlayTexture;
varying vec2 vecOverlayTexCoord;
varying float hasOverlay;
#endif
#ifdef NORMAL_AND_DEPTH
varying vec4 oriVertex;
varying vec3 perVertexNormals;
varying float depthInCamera;
#ifdef GL_EXT_frag_depth
#extension GL_EXT_frag_depth : enable
#endif
#endif
#ifdef APPLY_SPLIT
uniform float uSplitDirection;
uniform float uSplitPosition;
#endif
#ifdef APPLY_SWIPE
uniform vec4 uSwipeRegion;
#endif
#ifdef REPLACE_SELECT_TYPE
varying float fSelected;
#endif
#ifdef SILHOUETTE_SELECT_TYPE
uniform vec4 uSelColor;
uniform int uSelectColorType;
varying float fSelectedForSilh;
#endif
#ifdef SKETCH_MODE
uniform vec4 uLineColor;
uniform float uLineWidth;
#endif
#ifdef Only_LineColor
uniform vec4 uLineColor;
#endif
uniform vec4 uEmissionColor;
#ifdef POST_EFFECT
uniform float uMaxBloomHeight;
#endif
uniform vec2 uPolygonOffset;
uniform vec2 uMinMaxTransparent;
struct LayerParameter
{
    vec4 translationAndBottom;
    vec4 minMaxTransparentAndPolygonOffset;
    vec4 selColor;
    float pointSize;
};
uniform vec4 uAmbientColor;
uniform vec4 uDiffuseColor;
uniform float uTexture0Width;
uniform float uTexture1Width;
struct MaterialParameter
{
    vec4 ambientColor;
    vec4 diffuseColor;
    mat4 texMatrix;
    vec2 textureWidth;
};
uniform vec4 uTexUVOffset;
uniform vec4 uFillForeColor;
struct MaterialDynamicParameter
{
    vec4 texUVOffset;
    vec4 fillForeColor;
};

uniform vec3 uAmbientLightColor;
uniform vec4 uSunLightColor;
uniform float uSunLightON;
struct LightParameter
{
    vec4 ambientLightColor;
    vec4 sunLightColor;
    vec4 sunDirECAndSunLightON;
};
LayerParameter u_LayerParam;
MaterialParameter u_MaterialParam;
MaterialDynamicParameter u_MaterialDynamicParameter;
LightParameter u_LightParam;
#ifdef PBR_THEME
uniform mat4 uPBRMaterials[NUM_PBR_MATERIALS];
varying float vPBRIndex;
#endif
varying vec4 vIsFiltByID;
varying vec4 vColor;
varying vec4 vPositionMC;
varying vec3 v_positionEC;
varying vec4 vSecondColor;
varying vec3 vNormalEC;
#ifdef Instance
varying vec3 vPositionRotateMC;
#endif
uniform float uShadowDarkness;
#ifdef IMAGERY
varying vec2 imgCoord;
uniform sampler2D uImgTexture;
uniform float uImgTextureAlpha;
uniform vec2 uImgTextureBound;
#endif
#ifndef INVALID_OBLIQUE
vec4 getTextureColor(out vec4 outTexCoord, out vec4 firstColor, out vec4 secColor)
{
#ifdef TextureBatch
    vec4 FColor = czm_getTexColorForS3M(uTexture, vTexCoord.xy, vTexSize.xy, vTexTran.xy, vTexScale.xy, vMaxMipLevel.x, outTexCoord.xy);
#else
    if (vTexMatrix.z < 0.0)
    {
        return vec4(1.0);
    }
    float texTileWidth0 = vTexMatrix.z * u_MaterialParam.textureWidth.x;
    vec3 realTexCoord = vec3(vTexCoord.xy, vTexCoordZ.x);
    vec4 FColor = czm_getTexColorForS3M(uTexture, realTexCoord, texTileWidth0, vTexMatrix.w, vTexMatrix.z, vTexMatrix.xy, vIsRGBA.x, u_MaterialDynamicParameter.texUVOffset, outTexCoord.xy);
#ifdef Map
    vec4 FMapColor = czm_getTexColorForS3M(uMapTexture, realTexCoord, texTileWidth0, vTexMatrix.w, vTexMatrix.z, vTexMatrix.xy, vIsRGBA.x, u_MaterialDynamicParameter.texUVOffset, outTexCoord.xy);
    if (FMapColor.a > 0.9)
    {
        FColor.rgb = FMapColor.bgr;
    }
#endif
#endif
    firstColor = FColor;
#ifdef MULTI_TEX
#ifdef TextureBatch
    vec4 SColor = czm_getTexColorForS3M(uSecTexture, vTexCoord.zw, vTexSize.zw, vTexTran.zw, vTexScale.zw, vMaxMipLevel.y, outTexCoord.zw);
#else
    float texTileWidth1 = vTexMatrix2.z * u_MaterialParam.textureWidth.y;
    realTexCoord = vec3(vTexCoord.zw, vTexCoordZ.y);
    vec4 SColor = czm_getTexColorForS3M(uSecTexture, realTexCoord, texTileWidth1, vTexMatrix2.w, vTexMatrix2.z, vTexMatrix2.xy, vIsRGBA.y, u_MaterialDynamicParameter.texUVOffset, outTexCoord.zw);
#endif
#ifdef SEC_TEX_EMISSION
    secColor = SColor;
    return FColor;
#else
    return FColor * SColor;
#endif
#else
    return FColor;
#endif
}
#endif
#ifdef SQCLIP
uniform sampler2D uFrontColorTexture;
uniform sampler2D uFrontDepthTexture;
uniform sampler2D uBackDepthTexture;
uniform float uSQMode;
float computeDepth()
{
#ifdef LOG_DEPTH
    return log2(v_depthFromNearPlusOne) * czm_oneOverLog2FarDepthFromNearPlusOne;
#else
    return gl_FragCoord.z;
#endif
}
bool isPointInObject(vec2 texCoord)
{
    bool bIn = false;
    vec4 colorInClipTexture = texture2D(uFrontColorTexture, texCoord.xy);
    if (colorInClipTexture.r > 0.99 && colorInClipTexture.g < 0.01 && colorInClipTexture.b < 0.01)
    {
        float depthNear = czm_unpackDepth(texture2D(uFrontDepthTexture, texCoord.xy)) - 0.00001;
        float depthFar = czm_unpackDepth(texture2D(uBackDepthTexture, texCoord.xy)) + 0.00001;
        float currentDepth = computeDepth();
        if (currentDepth > depthNear && currentDepth < depthFar)
        {
            bIn = true;
        }
    }
    return uSQMode < 0.5 ? !bIn : bIn;
}
#endif
vec3 SRGBtoLINEAR3(vec3 srgbIn)
{
    return pow(srgbIn, vec3(2.2));
}
vec4 SRGBtoLINEAR4(vec4 srgbIn)
{
    srgbIn = srgbIn;
    vec3 linearOut = pow(srgbIn.rgb, vec3(2.2));
    return vec4(linearOut, srgbIn.a);
}
vec3 LINEARtoSRGB(vec3 linearIn)
{
#ifndef HDR
    return pow(linearIn, vec3(1.0 / 2.2));
#else
    return linearIn;
#endif
}
#include <brdf>
void InitUniformStructParameter()
{
#ifdef UNIFORM_BUFFER
#else
    u_LayerParam.minMaxTransparentAndPolygonOffset.x = uMinMaxTransparent.x;
    u_LayerParam.minMaxTransparentAndPolygonOffset.y = uMinMaxTransparent.y;
    u_LayerParam.minMaxTransparentAndPolygonOffset.z = uPolygonOffset.x;
    u_LayerParam.minMaxTransparentAndPolygonOffset.w = uPolygonOffset.y;
    u_MaterialParam.textureWidth.x = uTexture0Width;
    u_MaterialParam.textureWidth.y = uTexture1Width;
    u_MaterialParam.ambientColor = uAmbientColor;
    u_MaterialParam.diffuseColor = uDiffuseColor;
    u_MaterialDynamicParameter.texUVOffset = uTexUVOffset;
    u_MaterialDynamicParameter.fillForeColor = uFillForeColor;
    u_LightParam.ambientLightColor.rgb = uAmbientLightColor;
    u_LightParam.sunLightColor = uSunLightColor;
    u_LightParam.ambientLightColor.a = 1.0;
    u_LightParam.sunDirECAndSunLightON.xyz = czm_sunDirectionEC;
    u_LightParam.sunDirECAndSunLightON.w = uSunLightON;
#endif
}
#ifdef FLOOD_ANALYSIS
uniform sampler2D uFloodFlagTexture;
uniform vec4 uFloodRect;
varying vec4 vFloodPos;
bool GetWaterColor(out vec4 color)
{
    float width = uFloodRect.z - uFloodRect.x;
    float height = uFloodRect.w - uFloodRect.y;
    if (vFloodPos.x < uFloodRect.x || vFloodPos.x > uFloodRect.z || vFloodPos.y < uFloodRect.y || vFloodPos.y > uFloodRect.w)
    {
        return false;
    }
    vec2 floodTexcoord = vec2((vFloodPos.x - uFloodRect.x) / width, (vFloodPos.y - uFloodRect.y) / height);
    vec4 flagColor = texture2D(uFloodFlagTexture, floodTexcoord);
    if (flagColor.r < 0.5)
    {
        return false;
    }
    color = vec4(40.0 / 255.0, 150.0 / 255.0, 200.0 / 255.0, 1.0);
    return true;
}
#endif
#ifdef VISIBLEDISTANCEMAX
uniform float uVisibleDistanceMax;
#endif
#include <executeServerExcavationDecl>
void main()
{
    InitUniformStructParameter();
    czm_s3mMaterialInput material;
    material.ambientColor = u_MaterialParam.ambientColor;
    material.diffuseColor = u_MaterialParam.diffuseColor;
    material.ambientLightColor = u_LightParam.ambientLightColor;
    material.sunLightColor = u_LightParam.sunLightColor;
    material.sunLightON = u_LightParam.sunDirECAndSunLightON.w;
    material.sunDirectionEC = u_LightParam.sunDirECAndSunLightON.xyz;
#ifdef FINAL_RESOLUTION_CLIP
    if (vertexClip.x > uMaxClip.x || vertexClip.y > uMaxClip.y || vertexClip.z > uMaxClip.z || vertexClip.x < uMinClip.x || vertexClip.y < uMinClip.y || vertexClip.z < uMinClip.z)
    {
        discard;
    }
#endif
#ifdef Height_Map
    gl_FragColor = czm_packValue(wValue);
    return;
#endif
    if (vColor.a == 0.0)
    {
        discard;
    }
#ifdef SQCLIP
    vec2 texCoord = vec2(gl_FragCoord.x / czm_viewport.z, gl_FragCoord.y / czm_viewport.w);
    if (!isPointInObject(texCoord))
    {
        discard;
    }
#endif
#ifdef NORMAL
    vec3 normalMC = normalize(czm_computeNormal(vPositionMC.xyz));
    normalMC = normalMC * 0.5 + vec3(0.5);
    gl_FragColor = vec4(normalMC, 1.0);
#ifdef GL_EXT_frag_depth
    gl_FragDepthEXT = gl_FragCoord.z;
#endif
#ifdef WEBGL2
    gl_FragDepthEXT = gl_FragCoord.z;
#endif
    return;
#endif
#ifdef NORMAL_AND_DEPTH
#ifdef SILHOUETTE_SELECT_TYPE
    if (fSelectedForSilh < 0.9)
    {
        discard;
    }
#endif
    vec3 normal = normalize(perVertexNormals);
    float dLength = length(perVertexNormals);
    if (dLength <= 0.9)
    {
        normal = vec3(czm_normal * czm_computeNormal(oriVertex.xyz));
    }
    normal = (normal + 1.0) * 0.5;
    gl_FragColor = vec4(normal, 1.0);
#ifdef GL_EXT_frag_depth
    gl_FragDepthEXT = gl_FragCoord.z;
#endif
#ifdef WEBGL2
    gl_FragDepthEXT = gl_FragCoord.z;
#endif
    return;
#endif
#ifdef APPLY_SPLIT
    if (uSplitDirection > 1.5)
    {
        if (gl_FragCoord.x > uSplitPosition)
        {
            discard;
        }
    }
    else if (uSplitDirection > 0.5)
    {
        if (gl_FragCoord.x < uSplitPosition)
        {
            discard;
        }
    }
    else if (uSplitDirection < -1.5)
    {
        if (gl_FragCoord.y < uSplitPosition)
        {
            discard;
        }
    }
    else if (uSplitDirection < -0.5)
    {
        if (gl_FragCoord.y > uSplitPosition)
        {
            discard;
        }
    }
#endif
#ifdef APPLY_SWIPE
    czm_RollerShutter(gl_FragCoord.xy, uSwipeRegion);
#endif
#ifdef SERVEREXCAVATION
    if (executeServerExcavation())
    {
        discard;
    }
#endif
#ifdef EXCAVATION
    if (czm_executeExcavation())
    {
        discard;
    }
#endif
    vec4 realTexCoord = vec4(0.0);
    vec4 baseColor = vColor;
#ifdef INVALID_OBLIQUE
    baseColor *= vec4(0.5, 0.5, 0.5, 1.0);
#else
    vec4 firstColor;
    vec4 secColor;
#ifdef InstanceRenderPipeline // 如果定义了 InstanceRenderPipeline 宏
    vec4 outTexColor = texture2D(uTexture, (vTexCoord.xy * uTexUVOffset.zw + uTexUVOffset.xy)); // 从纹理中采样颜色
    realTexCoord.xy = vTexCoord.xy; // 将纹理坐标保存到 realTexCoord 中
#else
    vec4 outTexColor = getTextureColor(realTexCoord, firstColor, secColor);
#endif

    outTexColor = SRGBtoLINEAR4(outTexColor);
    baseColor = baseColor * outTexColor;
#endif
    gl_FragColor = baseColor;
#ifdef BRDF
    gl_FragColor = brdf(baseColor, realTexCoord.xy, vTexCoord.xy, v_positionEC, vPositionMC.xyz, vNormalEC, uSunLightColor);
#endif
#ifdef ADJUST_COLOR
    gl_FragColor.rgb = czm_adjustColor(gl_FragColor.rgb);
#endif
#ifdef TRANSPARENT_BACK_COLOR
    if (uTransparentBackColorTolerance > 0.01)
    {
        float rDiff = abs(uTransparentBackColor.r - gl_FragColor.r);
        float gDiff = abs(uTransparentBackColor.g - gl_FragColor.g);
        float bDiff = abs(uTransparentBackColor.b - gl_FragColor.b);
        if (rDiff < uTransparentBackColorTolerance && gDiff < uTransparentBackColorTolerance && bDiff < uTransparentBackColorTolerance)
        {
            discard;
        }
    }
#endif
#ifdef REPLACE_COLOR_TYPE
    gl_FragColor = vColor;
#endif
#ifdef REPLACE_SELECT_TYPE
    if (fSelected > 0.9)
    {
        gl_FragColor = vColor;
    }
#endif
#ifdef VISIBLEDISTANCEMAX
    if (length(v_positionEC) > uVisibleDistanceMax)
    {
        float minAlphl = min(1.0, (length(v_positionEC) - uVisibleDistanceMax) / 2000.0);
        gl_FragColor.a = 1.0 - minAlphl;
    }
#endif
#ifdef HAS_LIGHT
#ifdef PBR
    czm_S3MPBR(gl_FragColor, realTexCoord);
#else
#ifndef BRDF
#ifdef Instance
    gl_FragColor *= czm_computeLightColorInstanceInFP(material, vPositionRotateMC, vPositionMC.xyz, vPositionMC.w, vNormalEC);
#else
#ifndef IGNORE_NORMAL
    gl_FragColor *= czm_computeLightColorInFP(material, vPositionMC.xyz, vPositionMC.w, vNormalEC);
#endif
#ifdef IS_SQUARE_PIPE
    gl_FragColor *= czm_computeLightColorInFP(material, vPositionMC.xyz, 0.0, vNormalEC);
#endif
#endif
#endif
#endif
#endif
#ifdef OVERLAY
    if (hasOverlay > 0.5)
    {
        vec4 overlayColor = texture2D(uOverlayTexture, vecOverlayTexCoord.xy);
        if (!(overlayColor.r > 0.999 && overlayColor.g > 0.999 && overlayColor.b > 0.999) && !(overlayColor.r < 0.001 && overlayColor.g < 0.001 && overlayColor.b < 0.001))
        {
            vec4 mixColor = mix(gl_FragColor, overlayColor, overlayColor.a);
            gl_FragColor = vec4(mixColor.r, mixColor.g, mixColor.b, gl_FragColor.a);
        }
    }
#endif
#ifdef HORIZONTAL_LINE
    gl_FragColor = czm_getHorizontalColor(gl_FragColor, wValue);
#endif
    if (gl_FragColor.a == 0.0)
    {
        discard;
    }
#ifdef CLIP
#ifdef CLIP_FILT_BY_ID
    gl_FragColor *= czm_clip(czm_modelView * vec4(vPositionMC.xyz, 1.0), vIsFiltByID.x);
#else
    gl_FragColor *= czm_clip(czm_modelView * vec4(vPositionMC.xyz, 1.0), 1.0);
#endif
#endif
#ifdef SILHOUETTE_SELECT_TYPE
    if (uSelectColorType == 2)
    {
        if (fSelectedForSilh > 0.9)
        {
            gl_FragColor = czm_sketchMode(gl_FragColor, uSelColor, 3.0);
        }
    }
    else
    {
        gl_FragColor = czm_sketchMode(gl_FragColor, uSelColor, 3.0);
    }
#endif
#ifdef SKETCH_MODE
    gl_FragColor = czm_sketchMode(gl_FragColor, uLineColor, uLineWidth);
    if (gl_FragColor.a < u_LayerParam.minMaxTransparentAndPolygonOffset.x)
    {
        discard;
    }
#endif
#ifdef Only_LineColor
    gl_FragColor = uLineColor;
#endif
#ifdef EMISSION_TEXTURE
    vec3 normalMC = normalize(czm_computeNormal(vPositionMC.xyz));
    float isNotTopFace = 1.0 - step(0.95, normalMC.z);
    float dayTime = 1.0 - czm_RGBToHSL(uAmbientLightColor.rgb).z;
    vec3 emissionTexColor = czm_getEmissiveTextureColor(wValue) * dayTime;
    gl_FragColor.rgb += uEmissionColor.rgb * emissionTexColor * isNotTopFace;
#endif
#ifdef SEC_TEX_EMISSION
    gl_FragColor.rgb += uEmissionColor.rgb * secColor.rgb;
#endif
#ifdef TEXTURE_MOVE
    gl_FragColor.rgb = uEmissionColor.rgb * baseColor.rgb;
#endif
#ifdef LOG_DEPTH
    if (u_LayerParam.minMaxTransparentAndPolygonOffset.z != 0.0 || u_LayerParam.minMaxTransparentAndPolygonOffset.w != 0.0)
    {
        float logZ = 1.0 / gl_FragCoord.w + 1.0;
        float DZ = max(dFdx(logZ), dFdy(logZ));
        logZ += DZ * u_LayerParam.minMaxTransparentAndPolygonOffset.z + 0.0000001 * u_LayerParam.minMaxTransparentAndPolygonOffset.w;
        czm_writeLogDepth(logZ);
    }
    else
    {
        czm_writeLogDepth(v_depthFromNearPlusOne);
    }
#endif
#ifdef PARTLY_TRANSPARENT
#ifdef TRANSPARENT_PASS
    if (gl_FragColor.a > 0.95)
    {
        discard;
    }
#else
    if (gl_FragColor.a <= 0.95)
    {
        discard;
    }
#endif
#endif
#ifndef BRDF
    gl_FragColor.rgb = LINEARtoSRGB(gl_FragColor.rgb);
#endif
    gl_FragColor = czm_gammaCorrect(gl_FragColor);
#ifdef HYPSOMETRIC
    if (uHypsometricVisible > 0.5)
    {
#ifdef Volume2
        vec4 volColor = texture2D(uVolumeTexture, vec2(vTexCoord.x, 1.0 - vTexCoord.y));
        gl_FragColor = czm_getHypsometricColor(gl_FragColor, volColor);
#else
        gl_FragColor = czm_getHypsometricColor(gl_FragColor, wValue);
#endif
    }
    gl_FragColor *= u_MaterialDynamicParameter.fillForeColor;
#endif
#ifdef IMAGERY
    vec2 texcood = vec2(imgCoord.x / uImgTextureBound.x, imgCoord.y / uImgTextureBound.y);
    vec4 imageColor = texture2D(uImgTexture, texcood);
    if (imageColor.a > 0.9 && uImgTextureAlpha > 0.9)
    {
        gl_FragColor = imageColor;
    }
    else
    {
        gl_FragColor.rgb = mix(gl_FragColor.rgb, imageColor.rgb, uImgTextureAlpha * imageColor.a);
    }
#endif
#ifdef FLOOD_ANALYSIS
    vec4 floodColor = vec4(1.0, 1.0, 1.0, 1.0);
    if (GetWaterColor(floodColor))
    {
        gl_FragColor = floodColor;
        return;
    }
#endif
}