define(["./buildModuleUrl-4e1b81e7","./Cartesian2-47311507","./Cartographic-3309dd0d","./Check-7b2a090c","./when-b60132fc","./Math-119be1a3","./ArcType-29cf2197","./arrayRemoveDuplicates-d2f048c5","./ComponentDatatype-c140a87d","./EllipsoidGeodesic-0f19ac62","./EllipsoidRhumbLine-ed1a6bf4","./EncodedCartesian3-f1396b05","./GeometryAttribute-3a88ba31","./IntersectionTests-7386ffbf","./PrimitiveType-a54dc62f","./Plane-7ae8294c","./WebMercatorProjection-01b1b5e7","./Event-16a2dfbf","./RuntimeError-4a5c8994","./WebGLConstants-4ae0db90","./FeatureDetection-c3b71206","./Cartesian4-3ca25aab"],(function(e,a,t,i,n,r,s,o,l,u,c,h,C,d,p,g,f,m,v,w,y,_){"use strict";function M(t){t=n.defaultValue(t,{}),this._ellipsoid=n.defaultValue(t.ellipsoid,a.Ellipsoid.WGS84),this._rectangle=n.defaultValue(t.rectangle,a.Rectangle.MAX_VALUE),this._projection=new e.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=n.defaultValue(t.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=n.defaultValue(t.numberOfLevelZeroTilesY,1),this._customDPI=t.customDPI,this._scaleDenominators=t.scaleDenominators,this._tileWidth=n.defaultValue(t.tileWidth,256),this._tileHeight=n.defaultValue(t.tileHeight,256),this._beginLevel=n.defaultValue(t.beginLevel,0)}Object.defineProperties(M.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}},beginLevel:{get:function(){return this._beginLevel}}}),M.prototype.getNumberOfXTilesAtLevel=function(e){if(n.defined(this._customDPI)&&n.defined(this._scaleDenominators)){var a=this.calculateResolution(e),t=this._tileWidth*a.x;return Math.ceil(this._rectangle.width/t)}return this._numberOfLevelZeroTilesX<<e-this._beginLevel},M.prototype.getNumberOfYTilesAtLevel=function(e){if(n.defined(this._customDPI)&&n.defined(this._scaleDenominators)){var a=this.calculateResolution(e),t=this._tileHeight*a.y;return Math.ceil(this._rectangle.height/t)}return this._numberOfLevelZeroTilesY<<e-this._beginLevel},M.prototype.rectangleToNativeRectangle=function(e,t){var i=r.CesiumMath.toDegrees(e.west),s=r.CesiumMath.toDegrees(e.south),o=r.CesiumMath.toDegrees(e.east),l=r.CesiumMath.toDegrees(e.north);return n.defined(t)?(t.west=i,t.south=s,t.east=o,t.north=l,t):new a.Rectangle(i,s,o,l)},M.prototype.tileXYToNativeRectangle=function(e,a,t,i){var n=this.tileXYToRectangle(e,a,t,i);return n.west=r.CesiumMath.toDegrees(n.west),n.south=r.CesiumMath.toDegrees(n.south),n.east=r.CesiumMath.toDegrees(n.east),n.north=r.CesiumMath.toDegrees(n.north),n},M.prototype.tileXYToRectangle=function(e,t,i,s){var o=this._rectangle;if(n.defined(this._customDPI)&&n.defined(this._scaleDenominators)){var l=this.calculateResolution(i),u=-r.CesiumMath.PI+e*this._tileWidth*l.x,c=-r.CesiumMath.PI+(e+1)*this._tileWidth*l.x,h=r.CesiumMath.PI_OVER_TWO-t*this._tileHeight*l.y,C=r.CesiumMath.PI_OVER_TWO-(t+1)*this._tileHeight*l.y;return n.defined(s)?(s.west=u,s.south=C,s.east=c,s.north=h,s):new a.Rectangle(u,C,c,h)}var d=this.getNumberOfXTilesAtLevel(i),p=this.getNumberOfYTilesAtLevel(i),g=o.width/d,f=(u=e*g+o.west,c=(e+1)*g+o.west,o.height/p);h=o.north-t*f,C=o.north-(t+1)*f;return n.defined(s)||(s=new a.Rectangle(u,C,c,h)),s.west=u,s.south=C,s.east=c,s.north=h,s},M.prototype.positionToTileXY=function(e,t,i){var s=this._rectangle;if(a.Rectangle.contains(s,e)){var o=this.getNumberOfXTilesAtLevel(t),l=this.getNumberOfYTilesAtLevel(t),u=s.width/o,c=s.height/l;if(n.defined(this._customDPI)&&n.defined(this._scaleDenominators)){var h=this.calculateResolution(t);u=this._tileWidth*h.x,c=this._tileHeight*h.y}var C=e.longitude;s.east<s.west&&(C+=r.CesiumMath.TWO_PI);var d=(C-s.west)/u|0;d>=o&&(d=o-1);var p=(s.north-e.latitude)/c|0;return p>=l&&(p=l-1),n.defined(i)?(i.x=d,i.y=p,i):new a.Cartesian2(d,p)}},M.prototype.calculateResolution=function(e){var t=.0254*this._scaleDenominators[e-this._beginLevel]/this._customDPI.x,i=.0254*this._scaleDenominators[e-this._beginLevel]/this._customDPI.y,n=a.Ellipsoid.WGS84.maximumRadius;return new a.Cartesian2(t/n,i/n)};var T=new t.Cartesian3,E=new t.Cartesian3,b=new t.Cartographic,P=new t.Cartesian3,O=new t.Cartesian3,I=new e.BoundingSphere,L=new M,D=[new t.Cartographic,new t.Cartographic,new t.Cartographic,new t.Cartographic],S=new a.Cartesian2,k={};function A(e){t.Cartographic.fromRadians(e.east,e.north,0,D[0]),t.Cartographic.fromRadians(e.west,e.north,0,D[1]),t.Cartographic.fromRadians(e.east,e.south,0,D[2]),t.Cartographic.fromRadians(e.west,e.south,0,D[3]);var a,i=0,n=0,r=0,s=0,o=k._terrainHeightsMaxLevel;for(a=0;a<=o;++a){for(var l=!1,u=0;u<4;++u){var c=D[u];if(L.positionToTileXY(c,a,S),0===u)r=S.x,s=S.y;else if(r!==S.x||s!==S.y){l=!0;break}}if(l)break;i=r,n=s}if(0!==a)return{x:i,y:n,level:a>o?o:a-1}}k.initialize=function(){var a=k._initPromise;return n.defined(a)||(a=e.Resource.fetchJson(e.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){k._terrainHeights=e})),k._initPromise=a),a},k.getMinimumMaximumHeights=function(e,i){i=n.defaultValue(i,a.Ellipsoid.WGS84);var r=A(e),s=k._defaultMinTerrainHeight,o=k._defaultMaxTerrainHeight;if(n.defined(r)){var l=r.level+"-"+r.x+"-"+r.y,u=k._terrainHeights[l];n.defined(u)&&(s=u[0],o=u[1]),i.cartographicToCartesian(a.Rectangle.northeast(e,b),T),i.cartographicToCartesian(a.Rectangle.southwest(e,b),E),t.Cartesian3.midpoint(E,T,P);var c=i.scaleToGeodeticSurface(P,O);if(n.defined(c)){var h=t.Cartesian3.distance(P,c);s=Math.min(s,-h)}else s=k._defaultMinTerrainHeight}return{minimumTerrainHeight:s=Math.max(k._defaultMinTerrainHeight,s),maximumTerrainHeight:o}},k.getBoundingSphere=function(t,i){i=n.defaultValue(i,a.Ellipsoid.WGS84);var r=A(t),s=k._defaultMaxTerrainHeight;if(n.defined(r)){var o=r.level+"-"+r.x+"-"+r.y,l=k._terrainHeights[o];n.defined(l)&&(s=l[1])}var u=e.BoundingSphere.fromRectangle3D(t,i,0);return e.BoundingSphere.fromRectangle3D(t,i,s,I),e.BoundingSphere.union(u,I,u)},k._terrainHeightsMaxLevel=6,k._defaultMaxTerrainHeight=9e3,k._defaultMinTerrainHeight=-1e5,k._terrainHeights=void 0,k._initPromise=void 0,Object.defineProperties(k,{initialized:{get:function(){return n.defined(k._terrainHeights)}}});var x=[e.GeographicProjection,f.WebMercatorProjection],N=x.length,R=Math.cos(r.CesiumMath.toRadians(30)),H=Math.cos(r.CesiumMath.toRadians(150));function V(e){var t=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).positions;this.width=n.defaultValue(e.width,1),this._positions=t,this.granularity=n.defaultValue(e.granularity,9999),this.loop=n.defaultValue(e.loop,!1),this.arcType=n.defaultValue(e.arcType,s.ArcType.GEODESIC),this._ellipsoid=n.defaultValue(e.ellipsoid,a.Ellipsoid.WGS84),this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(V.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+a.Ellipsoid.packedLength+1+1}}}),V.setProjectionAndEllipsoid=function(e,a){for(var t=0,i=0;i<N;i++)if(a instanceof x[i]){t=i;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var z=new t.Cartesian3,j=new t.Cartesian3,G=new t.Cartesian3;function B(e,a,i,n,r){var s=Z(n,e,0,z),o=Z(n,e,i,j),l=Z(n,a,0,G),u=Q(o,s,j),c=Q(l,s,G);return t.Cartesian3.cross(c,u,r),t.Cartesian3.normalize(r,r)}var W=new t.Cartographic,F=new t.Cartesian3,Y=new t.Cartesian3,X=new t.Cartesian3;function q(e,a,i,n,r,o,l,h,C,d,p){if(0!==r){var g;o===s.ArcType.GEODESIC?g=new u.EllipsoidGeodesic(e,a,l):o===s.ArcType.RHUMB&&(g=new c.EllipsoidRhumbLine(e,a,l));var f=g.surfaceDistance;if(!(f<r))for(var m=B(e,a,n,l,X),v=Math.ceil(f/r),w=f/v,y=w,_=v-1,M=h.length,T=0;T<_;T++){var E=g.interpolateUsingSurfaceDistance(y,W),b=Z(l,E,i,F),P=Z(l,E,n,Y);t.Cartesian3.pack(m,h,M),t.Cartesian3.pack(b,C,M),t.Cartesian3.pack(P,d,M),p.push(E.latitude),p.push(E.longitude),M+=3,y+=w}}}var U=new t.Cartographic;function Z(e,a,i,n){return t.Cartographic.clone(a,U),U.height=i,t.Cartographic.toCartesian(U,e,n)}function Q(e,a,i){return t.Cartesian3.subtract(e,a,i),t.Cartesian3.normalize(i,i),i}V.pack=function(e,i,r){var s=n.defaultValue(r,0),o=e._positions,l=o.length;i[s++]=l;for(var u=0;u<l;++u){var c=o[u];t.Cartesian3.pack(c,i,s),s+=3}return i[s++]=e.granularity,i[s++]=e.loop?1:0,i[s++]=e.arcType,a.Ellipsoid.pack(e._ellipsoid,i,s),s+=a.Ellipsoid.packedLength,i[s++]=e._projectionIndex,i[s++]=e._scene3DOnly?1:0,i},V.unpack=function(e,i,r){for(var s=n.defaultValue(i,0),o=e[s++],l=new Array(o),u=0;u<o;u++)l[u]=t.Cartesian3.unpack(e,s),s+=3;var c=e[s++],h=1===e[s++],C=e[s++],d=a.Ellipsoid.unpack(e,s);s+=a.Ellipsoid.packedLength;var p=e[s++],g=1===e[s++];if(!n.defined(r)){var f=new V({positions:l,granularity:c,loop:h,arcType:C,ellipsoid:d});return f._projectionIndex=p,f._scene3DOnly=g,f}return r._positions=l,r.granularity=c,r.loop=h,r.arcType=C,r._ellipsoid=d,r._projectionIndex=p,r._scene3DOnly=g,r};var J=new t.Cartesian3,K=new t.Cartesian3,$=new t.Cartesian3,ee=new t.Cartesian3,ae=new g.Plane(t.Cartesian3.UNIT_X,0),te=new t.Cartesian3;function ie(e,a,i,n,s){var o=Q(i,a,te),l=Q(e,a,J),u=Q(n,a,K),c=t.Cartesian3.cross(o,l,ee);c=t.Cartesian3.normalize(c,c);var h=g.Plane.fromPointNormal(a,c,ae),C=g.Plane.getPointDistance(h,n);if(r.CesiumMath.equalsEpsilon(C,0,r.CesiumMath.EPSILON7))return t.Cartesian3.clone(c,s),s;s=t.Cartesian3.add(u,l,s),s=t.Cartesian3.normalize(s,s);var d=t.Cartesian3.cross(o,s,$);return t.Cartesian3.normalize(d,d),t.Cartesian3.cross(d,o,s),t.Cartesian3.normalize(s,s),t.Cartesian3.dot(u,d)<0&&(s=t.Cartesian3.negate(s,s)),s}var ne=g.Plane.fromPointNormal(t.Cartesian3.ZERO,t.Cartesian3.UNIT_Y),re=new t.Cartesian3,se=new t.Cartesian3,oe=new t.Cartesian3,le=new t.Cartesian3,ue=new t.Cartesian3,ce=new t.Cartesian3,he=new t.Cartographic,Ce=new t.Cartographic,de=new t.Cartographic;V.createGeometry=function(i){var u,p,g,f,m,v,w=!i._scene3DOnly,y=i.loop,_=i._ellipsoid,M=i.granularity,T=i.arcType,E=new x[i._projectionIndex](_),b=1e3,P=i._positions,O=P.length;2===O&&(y=!1);var I,L,D,S=new c.EllipsoidRhumbLine(void 0,void 0,_),A=[P[0]];for(p=0;p<O-1;p++)g=P[p],f=P[p+1],I=d.IntersectionTests.lineSegmentPlane(g,f,ne,ce),!n.defined(I)||t.Cartesian3.equalsEpsilon(I,g,r.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(I,f,r.CesiumMath.EPSILON7)||(i.arcType===s.ArcType.GEODESIC?A.push(t.Cartesian3.clone(I)):i.arcType===s.ArcType.RHUMB&&(D=_.cartesianToCartographic(I,he).longitude,m=_.cartesianToCartographic(g,he),v=_.cartesianToCartographic(f,Ce),S.setEndPoints(m,v),L=S.findIntersectionWithLongitude(D,de),I=_.cartographicToCartesian(L,ce),!n.defined(I)||t.Cartesian3.equalsEpsilon(I,g,r.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(I,f,r.CesiumMath.EPSILON7)||A.push(t.Cartesian3.clone(I)))),A.push(f);y&&(g=P[O-1],f=P[0],I=d.IntersectionTests.lineSegmentPlane(g,f,ne,ce),!n.defined(I)||t.Cartesian3.equalsEpsilon(I,g,r.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(I,f,r.CesiumMath.EPSILON7)||(i.arcType===s.ArcType.GEODESIC?A.push(t.Cartesian3.clone(I)):i.arcType===s.ArcType.RHUMB&&(D=_.cartesianToCartographic(I,he).longitude,m=_.cartesianToCartographic(g,he),v=_.cartesianToCartographic(f,Ce),S.setEndPoints(m,v),L=S.findIntersectionWithLongitude(D,de),I=_.cartographicToCartesian(L,ce),!n.defined(I)||t.Cartesian3.equalsEpsilon(I,g,r.CesiumMath.EPSILON7)||t.Cartesian3.equalsEpsilon(I,f,r.CesiumMath.EPSILON7)||A.push(t.Cartesian3.clone(I)))));var N=A.length,H=new Array(N);for(p=0;p<N;p++){var V=t.Cartographic.fromCartesian(A[p],_);V.height=0,H[p]=V}if(!((N=(H=o.arrayRemoveDuplicates(H,t.Cartographic.equalsEpsilon)).length)<2)){var z=[],j=[],G=[],W=[],F=re,Y=se,X=oe,U=le,J=ue,K=H[0],$=H[1];for(F=Z(_,H[N-1],0,F),U=Z(_,$,0,U),Y=Z(_,K,0,Y),X=Z(_,K,b,X),J=y?ie(F,Y,X,U,J):B(K,$,b,_,J),t.Cartesian3.pack(J,j,0),t.Cartesian3.pack(Y,G,0),t.Cartesian3.pack(X,W,0),z.push(K.latitude),z.push(K.longitude),q(K,$,0,b,M,T,_,j,G,W,z),p=1;p<N-1;++p){F=t.Cartesian3.clone(Y,F),Y=t.Cartesian3.clone(U,Y);var ee=H[p];Z(_,ee,b,X),Z(_,H[p+1],0,U),ie(F,Y,X,U,J),u=j.length,t.Cartesian3.pack(J,j,u),t.Cartesian3.pack(Y,G,u),t.Cartesian3.pack(X,W,u),z.push(ee.latitude),z.push(ee.longitude),q(H[p],H[p+1],0,b,M,T,_,j,G,W,z)}var ae=H[N-1],te=H[N-2];if(Y=Z(_,ae,0,Y),X=Z(_,ae,b,X),y){var pe=H[0];J=ie(F=Z(_,te,0,F),Y,X,U=Z(_,pe,0,U),J)}else J=B(te,ae,b,_,J);if(u=j.length,t.Cartesian3.pack(J,j,u),t.Cartesian3.pack(Y,G,u),t.Cartesian3.pack(X,W,u),z.push(ae.latitude),z.push(ae.longitude),y){for(q(ae,K,0,b,M,T,_,j,G,W,z),u=j.length,p=0;p<3;++p)j[u+p]=j[p],G[u+p]=G[p],W[u+p]=W[p];z.push(K.latitude),z.push(K.longitude)}return function(i,n,s,o,u,c,d){var p,g,f,m,v,w,y=n._ellipsoid,_=s.length/3-1,M=8*_,T=4*M,E=36*_,b=M>65535?new Uint32Array(E):new Uint16Array(E),P=new Float64Array(3*M),O=new Float32Array(T),I=new Float32Array(T),L=new Float32Array(T),D=new Float32Array(T),S=new Float32Array(T);d&&(f=new Float32Array(T),m=new Float32Array(T),v=new Float32Array(T),w=new Float32Array(2*M));var A=c.length/2,x=0,N=Ie;N.height=0;var H=Le;H.height=0;var V=De,z=Se;if(d)for(g=0,p=1;p<A;p++)N.latitude=c[g],N.longitude=c[g+1],H.latitude=c[g+2],H.longitude=c[g+3],V=n.project(N,V),z=n.project(H,z),x+=t.Cartesian3.distance(V,z),g+=2;var j=o.length/3;z=t.Cartesian3.unpack(o,0,z);var G,B=0;for(g=3,p=1;p<j;p++)V=t.Cartesian3.clone(z,V),z=t.Cartesian3.unpack(o,g,z),B+=t.Cartesian3.distance(V,z),g+=3;g=3;var W=0,F=0,Y=0,X=0,q=!1,U=t.Cartesian3.unpack(s,0,Ae),Z=t.Cartesian3.unpack(o,0,Se),J=t.Cartesian3.unpack(u,0,Ne);if(i){me(J,t.Cartesian3.unpack(s,s.length-6,ke),U,Z)&&(J=t.Cartesian3.negate(J,J))}var K=0,$=0,ee=0;for(p=0;p<_;p++){var ae,te,ie,ne,re=t.Cartesian3.clone(U,ke),se=t.Cartesian3.clone(Z,De),oe=t.Cartesian3.clone(J,xe);if(q&&(oe=t.Cartesian3.negate(oe,oe)),U=t.Cartesian3.unpack(s,g,Ae),Z=t.Cartesian3.unpack(o,g,Se),q=me(J=t.Cartesian3.unpack(u,g,Ne),re,U,Z),N.latitude=c[W],N.longitude=c[W+1],H.latitude=c[W+2],H.longitude=c[W+3],d){var le=Oe(N,H);ae=n.project(N,Be);var ue=Q(te=n.project(H,We),ae,ea);ue.y=Math.abs(ue.y),ie=Fe,ne=Ye,0===le||t.Cartesian3.dot(ue,t.Cartesian3.UNIT_Y)>R?(ie=_e(n,N,oe,ae,Fe),ne=_e(n,H,J,te,Ye)):1===le?(ne=_e(n,H,J,te,Ye),ie.x=0,ie.y=r.CesiumMath.sign(N.longitude-Math.abs(H.longitude)),ie.z=0):(ie=_e(n,N,oe,ae,Fe),ne.x=0,ne.y=r.CesiumMath.sign(N.longitude-H.longitude),ne.z=0)}var ce=t.Cartesian3.distance(se,Z),he=h.EncodedCartesian3.fromCartesian(re,Ke),Ce=t.Cartesian3.subtract(U,re,Xe),de=t.Cartesian3.normalize(Ce,Ze),pe=t.Cartesian3.subtract(se,re,qe);pe=t.Cartesian3.normalize(pe,pe);var ge=t.Cartesian3.cross(de,pe,Ze);ge=t.Cartesian3.normalize(ge,ge);var fe=t.Cartesian3.cross(pe,oe,Qe);fe=t.Cartesian3.normalize(fe,fe);var ve=t.Cartesian3.subtract(Z,U,Ue);ve=t.Cartesian3.normalize(ve,ve);var we=t.Cartesian3.cross(J,ve,Je);we=t.Cartesian3.normalize(we,we);var ye,Me,Te,be=ce/B,oa=K/B,la=0,ua=0,ca=0;if(d){la=t.Cartesian3.distance(ae,te),ye=h.EncodedCartesian3.fromCartesian(ae,$e),Me=t.Cartesian3.subtract(te,ae,ea);var ha=(Te=t.Cartesian3.normalize(Me,aa)).x;Te.x=Te.y,Te.y=-ha,ua=la/x,ca=$/x}for(G=0;G<8;G++){var Ca=X+4*G,da=F+2*G,pa=Ca+3,ga=G<4?1:-1,fa=2===G||3===G||6===G||7===G?1:-1;t.Cartesian3.pack(he.high,O,Ca),O[pa]=Ce.x,t.Cartesian3.pack(he.low,I,Ca),I[pa]=Ce.y,t.Cartesian3.pack(fe,L,Ca),L[pa]=Ce.z,t.Cartesian3.pack(we,D,Ca),D[pa]=be*ga,t.Cartesian3.pack(ge,S,Ca);var ma=oa*fa;0===ma&&fa<0&&(ma=Number.POSITIVE_INFINITY),S[pa]=ma,d&&(f[Ca]=ye.high.x,f[Ca+1]=ye.high.y,f[Ca+2]=ye.low.x,f[Ca+3]=ye.low.y,v[Ca]=-ie.y,v[Ca+1]=ie.x,v[Ca+2]=ne.y,v[Ca+3]=-ne.x,m[Ca]=Me.x,m[Ca+1]=Me.y,m[Ca+2]=Te.x,m[Ca+3]=Te.y,w[da]=ua*ga,0===(ma=ca*fa)&&fa<0&&(ma=Number.POSITIVE_INFINITY),w[da+1]=ma)}var va=je,wa=Ge,ya=Ve,_a=ze,Ma=a.Rectangle.fromCartographicArray(Re,He),Ta=k.getMinimumMaximumHeights(Ma,y),Ea=Ta.minimumTerrainHeight,ba=Ta.maximumTerrainHeight;ee+=Ea,ee+=ba,Ee(re,se,Ea,ba,va,ya),Ee(U,Z,Ea,ba,wa,_a);var Pa=t.Cartesian3.multiplyByScalar(ge,r.CesiumMath.EPSILON5,ta);t.Cartesian3.add(va,Pa,va),t.Cartesian3.add(wa,Pa,wa),t.Cartesian3.add(ya,Pa,ya),t.Cartesian3.add(_a,Pa,_a),Pe(va,wa),Pe(ya,_a),t.Cartesian3.pack(va,P,Y),t.Cartesian3.pack(wa,P,Y+3),t.Cartesian3.pack(_a,P,Y+6),t.Cartesian3.pack(ya,P,Y+9),Pa=t.Cartesian3.multiplyByScalar(ge,-2*r.CesiumMath.EPSILON5,ta),t.Cartesian3.add(va,Pa,va),t.Cartesian3.add(wa,Pa,wa),t.Cartesian3.add(ya,Pa,ya),t.Cartesian3.add(_a,Pa,_a),Pe(va,wa),Pe(ya,_a),t.Cartesian3.pack(va,P,Y+12),t.Cartesian3.pack(wa,P,Y+15),t.Cartesian3.pack(_a,P,Y+18),t.Cartesian3.pack(ya,P,Y+21),W+=2,g+=3,F+=16,Y+=24,X+=32,K+=ce,$+=la}g=0;var Oa=0;for(p=0;p<_;p++){for(G=0;G<ra;G++)b[g+G]=na[G]+Oa;Oa+=8,g+=ra}var Ia=ia;e.BoundingSphere.fromVertices(s,t.Cartesian3.ZERO,3,Ia[0]),e.BoundingSphere.fromVertices(o,t.Cartesian3.ZERO,3,Ia[1]);var La=e.BoundingSphere.fromBoundingSpheres(Ia);La.radius+=ee/(2*_);var Da={position:new C.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:P}),startHiAndForwardOffsetX:sa(O),startLoAndForwardOffsetY:sa(I),startNormalAndForwardOffsetZ:sa(L),endNormalAndTextureCoordinateNormalizationX:sa(D),rightNormalAndTextureCoordinateNormalizationY:sa(S)};d&&(Da.startHiLo2D=sa(f),Da.offsetAndRight2D=sa(m),Da.startEndNormals2D=sa(v),Da.texcoordNormalization2D=new C.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:w}));return new C.Geometry({attributes:Da,indices:b,boundingSphere:La})}(y,E,G,W,j,z,w)}};var pe=new t.Cartesian3,ge=new p.Matrix3,fe=new C.Quaternion;function me(e,a,i,n){var s=Q(i,a,pe),o=t.Cartesian3.dot(s,e);if(o>R||o<H){var l=Q(n,i,te),u=o<H?r.CesiumMath.PI_OVER_TWO:-r.CesiumMath.PI_OVER_TWO,c=C.Quaternion.fromAxisAngle(l,u,fe),h=p.Matrix3.fromQuaternion(c,ge);return p.Matrix3.multiplyByVector(h,e,e),!0}return!1}var ve=new t.Cartographic,we=new t.Cartesian3,ye=new t.Cartesian3;function _e(e,a,i,n,s){var o=t.Cartographic.toCartesian(a,e._ellipsoid,we),l=t.Cartesian3.add(o,i,ye),u=!1,c=e._ellipsoid,h=c.cartesianToCartographic(l,ve);Math.abs(a.longitude-h.longitude)>r.CesiumMath.PI_OVER_TWO&&(u=!0,l=t.Cartesian3.subtract(o,i,ye),h=c.cartesianToCartographic(l,ve)),h.height=0;var C=e.project(h,s);return(s=t.Cartesian3.subtract(C,n,s)).z=0,s=t.Cartesian3.normalize(s,s),u&&t.Cartesian3.negate(s,s),s}var Me=new t.Cartesian3,Te=new t.Cartesian3;function Ee(e,a,i,n,r,s){var o=t.Cartesian3.subtract(a,e,Me);t.Cartesian3.normalize(o,o);var l=i-0,u=t.Cartesian3.multiplyByScalar(o,l,Te);t.Cartesian3.add(e,u,r);var c=n-1e3;u=t.Cartesian3.multiplyByScalar(o,c,Te),t.Cartesian3.add(a,u,s)}var be=new t.Cartesian3;function Pe(e,a){var i=g.Plane.getPointDistance(ne,e),n=g.Plane.getPointDistance(ne,a),s=be;r.CesiumMath.equalsEpsilon(i,0,r.CesiumMath.EPSILON2)?(s=Q(a,e,s),t.Cartesian3.multiplyByScalar(s,r.CesiumMath.EPSILON2,s),t.Cartesian3.add(e,s,e)):r.CesiumMath.equalsEpsilon(n,0,r.CesiumMath.EPSILON2)&&(s=Q(e,a,s),t.Cartesian3.multiplyByScalar(s,r.CesiumMath.EPSILON2,s),t.Cartesian3.add(a,s,a))}function Oe(e,a){var t=Math.abs(e.longitude),i=Math.abs(a.longitude);if(r.CesiumMath.equalsEpsilon(t,r.CesiumMath.PI,r.CesiumMath.EPSILON11)){var n=r.CesiumMath.sign(a.longitude);return e.longitude=n*(t-r.CesiumMath.EPSILON11),1}if(r.CesiumMath.equalsEpsilon(i,r.CesiumMath.PI,r.CesiumMath.EPSILON11)){var s=r.CesiumMath.sign(e.longitude);return a.longitude=s*(i-r.CesiumMath.EPSILON11),2}return 0}var Ie=new t.Cartographic,Le=new t.Cartographic,De=new t.Cartesian3,Se=new t.Cartesian3,ke=new t.Cartesian3,Ae=new t.Cartesian3,xe=new t.Cartesian3,Ne=new t.Cartesian3,Re=[Ie,Le],He=new a.Rectangle,Ve=new t.Cartesian3,ze=new t.Cartesian3,je=new t.Cartesian3,Ge=new t.Cartesian3,Be=new t.Cartesian3,We=new t.Cartesian3,Fe=new t.Cartesian3,Ye=new t.Cartesian3,Xe=new t.Cartesian3,qe=new t.Cartesian3,Ue=new t.Cartesian3,Ze=new t.Cartesian3,Qe=new t.Cartesian3,Je=new t.Cartesian3,Ke=new h.EncodedCartesian3,$e=new h.EncodedCartesian3,ea=new t.Cartesian3,aa=new t.Cartesian3,ta=new t.Cartesian3,ia=[new e.BoundingSphere,new e.BoundingSphere],na=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],ra=na.length;function sa(e){return new C.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return V._projectNormal=_e,function(e,a){return k.initialize().then((function(){return n.defined(a)&&(e=V.unpack(e,a)),V.createGeometry(e)}))}}));
