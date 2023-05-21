void CalculateMipLevel(in vec2 inTexCoord, in float vecTile, in float fMaxMip, inout float mipLevel)
{
    vec2 dx = dFdx(inTexCoord * vecTile);
    vec2 dy = dFdy(inTexCoord * vecTile);
    float dotX = dot(dx, dx);
    float dotY = dot(dy, dy);
    float dMax = max(dotX, dotY);
    float dMin = min(dotX, dotY);
    float offset = (dMax - dMin) / (dMax + dMin);
    offset = clamp(offset, 0.0, 1.0);
    float d = dMax * (1.0 - offset) + dMin * offset;
    mipLevel = 0.5 * log2(d);
    mipLevel = clamp(mipLevel, 0.0, fMaxMip - 1.62);
}
void CalculateMipLevel(in vec2 inTexCoord, in vec2 vecTile, in float fMaxMip, inout float mipLevel)
{
    vec2 dx = dFdx(inTexCoord * vecTile.x);
    vec2 dy = dFdy(inTexCoord * vecTile.y);
    float dotX = dot(dx, dx);
    float dotY = dot(dy, dy);
    float dMax = max(dotX, dotY);
    float dMin = min(dotX, dotY);
    float offset = (dMax - dMin) / (dMax + dMin);
    offset = clamp(offset, 0.0, 1.0);
    float d = dMax * (1.0 - offset) + dMin * offset;
    mipLevel = 0.5 * log2(d);
    mipLevel = clamp(mipLevel, 0.0, fMaxMip - 1.62);
}
void CalculateTexCoord(in vec3 inTexCoord, in float scale, in float XTran, in float YTran, in float fTile, in float mipLevel, inout vec2 outTexCoord)
{
    if (inTexCoord.z < -9000.0)
    {
        outTexCoord = inTexCoord.xy;
    }
    else
    {
        vec2 fTexCoord = fract(inTexCoord.xy);
        float offset = 1.0 * pow(2.0, mipLevel) / fTile;
        fTexCoord = clamp(fTexCoord, offset, 1.0 - offset);
        outTexCoord.x = (fTexCoord.x + XTran) * scale;
        outTexCoord.y = (fTexCoord.y + YTran) * scale;
    }
}
vec4 czm_getTexColorForS3M(sampler2D curTexture, vec3 oriTexCoord, float texTileWidth, float fMaxMipLev, float fTexCoordScale, vec2 vecTexCoordTranslate, float isRGBA, vec4 texUVoffset, out vec2 outTexCoord)
{
    vec4 color = vec4(1.0);
    float mipLevel = 0.0;
#ifdef GL_OES_standard_derivatives
    CalculateMipLevel(oriTexCoord.xy, texTileWidth, fMaxMipLev, mipLevel);
#endif
    vec2 realTexCoord;
    CalculateTexCoord(oriTexCoord, fTexCoordScale, vecTexCoordTranslate.x, vecTexCoordTranslate.y, texTileWidth, mipLevel, realTexCoord);
    if (isRGBA > 0.5)
    {
        vec2 rgbTexCoord;
        rgbTexCoord.x = (realTexCoord.x + vecTexCoordTranslate.x * fTexCoordScale) * 0.5;
        rgbTexCoord.y = (realTexCoord.y + vecTexCoordTranslate.y * fTexCoordScale) * 0.5;
        rgbTexCoord.xy += texUVoffset.xy;
        color = texture2D(curTexture, rgbTexCoord.xy, -10.0);
        vec2 vecAlphaTexCoord;
        vecAlphaTexCoord.x = rgbTexCoord.x;
        vecAlphaTexCoord.y = rgbTexCoord.y + fTexCoordScale * 0.5;
        vecAlphaTexCoord.xy += texUVoffset.xy;
        color.a = texture2D(curTexture, vecAlphaTexCoord.xy, -10.0).r;
    }
    else
    {
        realTexCoord = realTexCoord * texUVoffset.zw + texUVoffset.xy;
        if (oriTexCoord.z < -9000.0)
        {
            color = texture2D(curTexture, realTexCoord.xy);
        }
        else
        {
#ifdef GL_EXT_shader_texture_lod
            color = texture2DLodEXT(curTexture, realTexCoord.xy, mipLevel);
#else
#ifdef WEBEL2
            color = textureLod(curTexture, realTexCoord.xy, mipLevel);
#else
            color = texture2D(curTexture, realTexCoord.xy, mipLevel);
#endif
#endif
        }
#ifdef RGBTOBGR
        color = color.bgra;
#endif
    }
    outTexCoord = realTexCoord;
    return color;
}
vec4 czm_getTexColorForS3M(sampler2D texture, vec2 uv, vec2 texDim, vec2 texTran, vec2 texScale, float maxMipLevel, out vec2 outTexCoord)
{
    if (maxMipLevel < 0.0)
    {
        return vec4(1.0);
    }
    vec4 colorCeil = vec4(1.0);
    float mipLevel = 0.0;
#ifdef GL_OES_standard_derivatives
    CalculateMipLevel(uv, texDim, maxMipLevel, mipLevel);
#endif
    float ceilMipLevel = ceil(mipLevel);
    vec2 translate = vec2(texTran.x, texTran.y);
    float temp;
    if (ceilMipLevel > 0.0)
    {
        translate.x = texTran.x + texScale.x;
        temp = pow(2.0, ceilMipLevel - 1.0);
        translate.y = texTran.y + texScale.y * (temp - 1.0) / temp;
    }
    float scale = 1.0 / pow(2.0, ceilMipLevel);
    vec2 texcoord = fract(uv);
    float offsetX = pow(2.0, ceilMipLevel) / texDim.x;
    float offsetY = pow(2.0, ceilMipLevel) / texDim.y;
    texcoord.x = clamp(texcoord.x, 0.0 + offsetX, 1.0 - offsetX);
    texcoord.y = clamp(texcoord.y, 0.0 + offsetY, 1.0 - offsetY);
    texcoord.x = texcoord.x * texScale.x * scale + translate.x;
    texcoord.y = texcoord.y * texScale.y * scale + translate.y;
#ifdef GL_EXT_shader_texture_lod
    colorCeil = texture2DLodEXT(texture, texcoord.xy, 0.0);
#else
#ifdef WEBEL2
    colorCeil = textureLod(texture, texcoord.xy, 0.0);
#else
    colorCeil = texture2D(texture, texcoord.xy, -10.0);
#endif
#endif
    vec4 colorFloor = vec4(1.0);
    float floorMipLevel = floor(mipLevel);
    translate = vec2(texTran.x, texTran.y);
    if (floorMipLevel > 0.0)
    {
        translate.x = texTran.x + texScale.x;
        temp = pow(2.0, floorMipLevel - 1.0);
        translate.y = texTran.y + texScale.y * (temp - 1.0) / temp;
    }
    scale = 1.0 / pow(2.0, floorMipLevel);
    texcoord = fract(uv);
    offsetX = pow(2.0, floorMipLevel) / texDim.x;
    offsetY = pow(2.0, floorMipLevel) / texDim.y;
    texcoord.x = clamp(texcoord.x, 0.0 + offsetX, 1.0 - offsetX);
    texcoord.y = clamp(texcoord.y, 0.0 + offsetY, 1.0 - offsetY);
    texcoord.x = texcoord.x * texScale.x * scale + translate.x;
    texcoord.y = texcoord.y * texScale.y * scale + translate.y;
#ifdef GL_EXT_shader_texture_lod
    colorFloor = texture2DLodEXT(texture, texcoord.xy, 0.0);
#else
#ifdef WEBEL2
    colorFloor = textureLod(texture, texcoord.xy, 0.0);
#else
    colorFloor = texture2D(texture, texcoord.xy, -10.0);
#endif
#endif
    vec4 color = colorCeil * 0.5 + colorFloor * 0.5;
    return color;
}
