define(["exports","./arrayRemoveDuplicates-d2f048c5","./Cartographic-3309dd0d","./when-b60132fc","./Math-119be1a3","./PolylinePipeline-2fe9092e","./GeometryAttribute-3a88ba31","./PrimitiveType-a54dc62f"],(function(e,i,t,r,n,a,o,l){"use strict";var s={};function h(e,i){return n.CesiumMath.equalsEpsilon(e.latitude,i.latitude,n.CesiumMath.EPSILON10)&&n.CesiumMath.equalsEpsilon(e.longitude,i.longitude,n.CesiumMath.EPSILON10)}var g=new t.Cartographic,p=new t.Cartographic;var d=new Array(2),u=new Array(2),y={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};function c(e,i){for(var r=new Array(e.length),n=0;n<e.length;n+=3){var a=new t.Cartesian3(e[n],e[n+1],e[n+2]);l.Matrix4.multiplyByPoint(i,a,a),r[n]=a.x,r[n+1]=a.y,r[n+2]=a.z}return r}s.computePositions=function(e,s,f,P,v,m,A){var w=function(e,n,a,o){var l=(n=i.arrayRemoveDuplicates(n,t.Cartesian3.equalsEpsilon)).length;if(!(l<2)){var s=r.defined(o),d=r.defined(a),u=!0,y=new Array(l),c=new Array(l),f=new Array(l),P=n[0];y[0]=P;var v=e.cartesianToCartographic(P,g);d&&(v.height=a[0]),u=u&&0==v.height,c[0]=v.height,f[0]=s?o[0]:0;for(var m=1,A=1;A<l;++A){var w=n[A],C=e.cartesianToCartographic(w,p);d&&(C.height=a[A]),u=u&&0==C.height,h(v,C)?v.height<C.height&&(c[m-1]=C.height):(y[m]=w,c[m]=C.height,f[m]=s?o[A]:0,t.Cartographic.clone(C,v),++m)}if(!(u||m<2))return y.length=m,c.length=m,f.length=m,{positions:y,topHeights:c,bottomHeights:f}}}(e,s,f,P);if(r.defined(w)){var C=o.Transforms.eastNorthUpToFixedFrame(w.positions[0],e,new l.Matrix4),b=l.Matrix4.inverse(C,new l.Matrix4);s=w.positions,f=w.topHeights,P=w.bottomHeights;var F,M,x,E,T=s.length,H=T-2,L=n.CesiumMath.chordLength(v,e.maximumRadius),q=y;if(q.minDistance=L,q.ellipsoid=e,m){var D,N=0;for(D=0;D<T-1;D++)N+=a.PolylinePipeline.numberOfPoints(s[D],s[D+1],L)+1;F=new Float64Array(3*N),M=new Float64Array(3*N),r.defined(A)&&(x=new Float64Array(3*N),E=new Float64Array(3*N));var O=d,R=u;q.positions=O,q.height=R;var G=0;for(D=0;D<T-1;D++){O[0]=s[D],O[1]=s[D+1],R[0]=f[D],R[1]=f[D+1];var I=a.PolylinePipeline.generateArc(q);F.set(I,G),r.defined(A)&&x.set(c(I,b),G),R[0]=P[D],R[1]=P[D+1],M.set(a.PolylinePipeline.generateArc(q),G),r.defined(A)&&E.set(c(a.PolylinePipeline.generateArc(q),b),G),G+=I.length}}else q.positions=s,q.height=f,F=new Float64Array(a.PolylinePipeline.generateArc(q)),r.defined(A)&&(x=new Float64Array(c(a.PolylinePipeline.generateArc(q)))),q.height=P,M=new Float64Array(a.PolylinePipeline.generateArc(q)),r.defined(A)&&(E=new Float64Array(c(a.PolylinePipeline.generateArc(q))));var S={pos:{bottomPositions:M,topPositions:F,numCorners:H}};return r.defined(A)&&(S.localPos={bottomPositions:E,topPositions:x,numCorners:H}),S}},e.WallGeometryLibrary=s}));
