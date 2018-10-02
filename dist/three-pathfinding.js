var e=function(){};e.computeCentroids=function(e){var t,n,r;for(t=0,n=e.faces.length;t<n;t++)(r=e.faces[t]).centroid=new THREE.Vector3(0,0,0),r.centroid.add(e.vertices[r.a]),r.centroid.add(e.vertices[r.b]),r.centroid.add(e.vertices[r.c]),r.centroid.divideScalar(3)},e.roundNumber=function(e,t){return Number(e.toFixed(t))},e.sample=function(e){return e[Math.floor(Math.random()*e.length)]},e.mergeVertexIds=function(e,t){var n=[];if(e.forEach(function(e){t.indexOf(e)>=0&&n.push(e)}),n.length<2)return[];n.includes(e[0])&&n.includes(e[e.length-1])&&e.push(e.shift()),n.includes(t[0])&&n.includes(t[t.length-1])&&t.push(t.shift()),n=[],e.forEach(function(e){t.includes(e)&&n.push(e)});for(var r=n[1],o=n[0],i=e.slice();i[0]!==r;)i.push(i.shift());for(var s=0,u=t.slice();u[0]!==o;)if(u.push(u.shift()),s++>10)throw new Error("Unexpected state");return u.shift(),u.pop(),i=i.concat(u)},e.setPolygonCentroid=function(e,t){var n=new THREE.Vector3,r=t.vertices;e.vertexIds.forEach(function(e){n.add(r[e])}),n.divideScalar(e.vertexIds.length),e.centroid.copy(n)},e.cleanPolygon=function(e,t){for(var n=[],r=t.vertices,o=0;o<e.vertexIds.length;o++){var i,s,u,c=r[e.vertexIds[o]];0===o?(i=e.vertexIds[1],s=e.vertexIds[e.vertexIds.length-1]):o===e.vertexIds.length-1?(i=e.vertexIds[0],s=e.vertexIds[e.vertexIds.length-2]):(i=e.vertexIds[o+1],s=e.vertexIds[o-1]),u=r[s];var h=r[i].clone().sub(c),a=u.clone().sub(c),d=h.angleTo(a);if(d>Math.PI-.01&&d<Math.PI+.01){var f=[];e.neighbours.forEach(function(t){t.vertexIds.includes(e.vertexIds[o])||f.push(t)}),e.neighbours=f}else n.push(e.vertexIds[o])}e.vertexIds=n,this.setPolygonCentroid(e,t)},e.isConvex=function(e,t){var n=t.vertices;if(e.vertexIds.length<3)return!1;for(var r=!0,o=[],i=0;i<e.vertexIds.length;i++){var s,u,c=n[e.vertexIds[i]];0===i?(s=n[e.vertexIds[1]],u=n[e.vertexIds[e.vertexIds.length-1]]):i===e.vertexIds.length-1?(s=n[e.vertexIds[0]],u=n[e.vertexIds[e.vertexIds.length-2]]):(s=n[e.vertexIds[i+1]],u=n[e.vertexIds[i-1]]);var h=s.clone().sub(c),a=u.clone().sub(c),d=h.angleTo(a);if(d===Math.PI||0===d)return!1;var f=h.cross(a).y;o.push(f)}return o.forEach(function(e){0===e&&(r=!1)}),o.forEach(o[0]>0?function(e){e<0&&(r=!1)}:function(e){e>0&&(r=!1)}),r},e.distanceToSquared=function(e,t){var n=e.x-t.x,r=e.y-t.y,o=e.z-t.z;return n*n+r*r+o*o},e.isPointInPoly=function(e,t){for(var n=!1,r=-1,o=e.length,i=o-1;++r<o;i=r)(e[r].z<=t.z&&t.z<e[i].z||e[i].z<=t.z&&t.z<e[r].z)&&t.x<(e[i].x-e[r].x)*(t.z-e[r].z)/(e[i].z-e[r].z)+e[r].x&&(n=!n);return n},e.isVectorInPolygon=function(e,t,n){var r=1e5,o=-1e5,i=[];return t.vertexIds.forEach(function(e){r=Math.min(n[e].y,r),o=Math.max(n[e].y,o),i.push(n[e])}),!!(e.y<o+.5&&e.y>r-.5&&this.isPointInPoly(i,e))},e.triarea2=function(e,t,n){return(n.x-e.x)*(t.z-e.z)-(t.x-e.x)*(n.z-e.z)},e.vequal=function(e,t){return this.distanceToSquared(e,t)<1e-5};var t=function(e){this.content=[],this.scoreFunction=e};t.prototype.push=function(e){this.content.push(e),this.sinkDown(this.content.length-1)},t.prototype.pop=function(){var e=this.content[0],t=this.content.pop();return this.content.length>0&&(this.content[0]=t,this.bubbleUp(0)),e},t.prototype.remove=function(e){var t=this.content.indexOf(e),n=this.content.pop();t!==this.content.length-1&&(this.content[t]=n,this.scoreFunction(n)<this.scoreFunction(e)?this.sinkDown(t):this.bubbleUp(t))},t.prototype.size=function(){return this.content.length},t.prototype.rescoreElement=function(e){this.sinkDown(this.content.indexOf(e))},t.prototype.sinkDown=function(e){for(var t=this.content[e];e>0;){var n=(e+1>>1)-1,r=this.content[n];if(!(this.scoreFunction(t)<this.scoreFunction(r)))break;this.content[n]=t,this.content[e]=r,e=n}},t.prototype.bubbleUp=function(e){for(var t=this.content.length,n=this.content[e],r=this.scoreFunction(n);;){var o=e+1<<1,i=o-1,s=null,u=void 0;if(i<t)(u=this.scoreFunction(this.content[i]))<r&&(s=i);if(o<t)this.scoreFunction(this.content[o])<(null===s?r:u)&&(s=o);if(null===s)break;this.content[e]=this.content[s],this.content[s]=n,e=s}};var n=function(){};n.init=function(e){for(var t=0;t<e.length;t++){var n=e[t];n.f=0,n.g=0,n.h=0,n.cost=1,n.visited=!1,n.closed=!1,n.parent=null}},n.cleanUp=function(e){for(var t=0;t<e.length;t++){var n=e[t];delete n.f,delete n.g,delete n.h,delete n.cost,delete n.visited,delete n.closed,delete n.parent}},n.heap=function(){return new t(function(e){return e.f})},n.search=function(e,t,n){this.init(e);var r=this.heap();for(r.push(t);r.size()>0;){var o=r.pop();if(o===n){for(var i=o,s=[];i.parent;)s.push(i),i=i.parent;return this.cleanUp(s),s.reverse()}o.closed=!0;for(var u=this.neighbours(e,o),c=0,h=u.length;c<h;c++){var a=u[c];if(!a.closed){var d=o.g+a.cost,f=a.visited;if(!f||d<a.g){if(a.visited=!0,a.parent=o,!a.centroid||!n.centroid)throw new Error("Unexpected state");a.h=a.h||this.heuristic(a.centroid,n.centroid),a.g=d,a.f=a.g+a.h,f?r.rescoreElement(a):r.push(a)}}}}return[]},n.heuristic=function(t,n){return e.distanceToSquared(t,n)},n.neighbours=function(e,t){for(var n=[],r=0;r<t.neighbours.length;r++)n.push(e[t.neighbours[r]]);return n};var r=1,o=function(){};o.buildZone=function(e){var t=this,n=this._buildNavigationMesh(e),r={};r.vertices=n.vertices;var o=this._buildPolygonGroups(n);r.groups=[];var i=function(e,t){for(var n=0;n<e.length;n++)if(t===e[n])return n};return o.forEach(function(e){var n=[];e.forEach(function(r){var o=r.neighbours.map(function(t){return i(e,t)}),s=r.neighbours.map(function(e){return t._getSharedVerticesInOrder(r,e)});n.push({id:i(e,r),neighbours:o,vertexIds:r.vertexIds,centroid:r.centroid,portals:s})}),r.groups.push(n)}),r},o._buildNavigationMesh=function(t){return e.computeCentroids(t),t.mergeVertices(),this._buildPolygonsFromGeometry(t)},o._buildPolygonGroups=function(e){var t=[],n=0,r=function(e){e.neighbours.forEach(function(t){void 0===t.group&&(t.group=e.group,r(t))})};return e.polygons.forEach(function(e){void 0===e.group&&(e.group=n++,r(e)),t[e.group]||(t[e.group]=[]),t[e.group].push(e)}),t},o._buildPolygonNeighbours=function(e,t,n){var r=new Set,o=n.get(e.vertexIds[0]),i=n.get(e.vertexIds[1]),s=n.get(e.vertexIds[2]);o.forEach(function(e){(i.has(e)||s.has(e))&&r.add(t.polygons[e])}),i.forEach(function(e){s.has(e)&&r.add(t.polygons[e])}),e.neighbours=Array.from(r)},o._buildPolygonsFromGeometry=function(e){for(var t=this,n=[],o=e.vertices,i=e.faceVertexUvs,s=new Map,u=0;u<o.length;u++)s.set(u,new Set);e.faces.forEach(function(e){n.push({id:r++,vertexIds:[e.a,e.b,e.c],centroid:e.centroid,normal:e.normal,neighbours:[]}),s.get(e.a).add(n.length-1),s.get(e.b).add(n.length-1),s.get(e.c).add(n.length-1)});var c={polygons:n,vertices:o,faceVertexUvs:i};return n.forEach(function(e){t._buildPolygonNeighbours(e,c,s)}),c},o._getSharedVerticesInOrder=function(e,t){var n=e.vertexIds,r=t.vertexIds,o=new Set;if(n.forEach(function(e){r.includes(e)&&o.add(e)}),o.size<2)return[];o.has(n[0])&&o.has(n[n.length-1])&&n.push(n.shift()),o.has(r[0])&&o.has(r[r.length-1])&&r.push(r.shift());var i=[];return n.forEach(function(e){r.includes(e)&&i.push(e)}),i};var i=function(){this.portals=[]};i.prototype.push=function(e,t){void 0===t&&(t=e),this.portals.push({left:e,right:t})},i.prototype.stringPull=function(){var t,n,r,o=this.portals,i=[],s=0,u=0,c=0;n=o[0].left,r=o[0].right,i.push(t=o[0].left);for(var h=1;h<o.length;h++){var a=o[h].left,d=o[h].right;if(e.triarea2(t,r,d)<=0){if(!(e.vequal(t,r)||e.triarea2(t,n,d)>0)){i.push(n),n=t=n,r=t,u=s=u,c=s,h=s;continue}r=d,c=h}if(e.triarea2(t,n,a)>=0){if(!(e.vequal(t,n)||e.triarea2(t,r,a)<0)){i.push(r),n=t=r,r=t,u=s=c,c=s,h=s;continue}n=a,u=h}}return 0!==i.length&&e.vequal(i[i.length-1],o[o.length-1].left)||i.push(o[o.length-1].left),this.path=i,i};var s,u=function(){this.zones={}};u.createZone=function(e){return e.isGeometry?console.warn("[three-pathfinding]: Use THREE.BufferGeometry, not THREE.Geometry, to create zone."):e=(new THREE.Geometry).fromBufferGeometry(e),o.buildZone(e)},u.prototype.setZoneData=function(e,t){this.zones[e]=t},u.prototype.getRandomNode=function(t,n,r,o){if(!this.zones[t])return new THREE.Vector3;r=r||null,o=o||0;var i=[];return this.zones[t].groups[n].forEach(function(t){r&&o?e.distanceToSquared(r,t.centroid)<o*o&&i.push(t.centroid):i.push(t.centroid)}),e.sample(i)||new THREE.Vector3},u.prototype.getClosestNode=function(t,n,r,o){void 0===o&&(o=!1);var i=this.zones[n].vertices,s=null,u=Infinity;return this.zones[n].groups[r].forEach(function(n){var r=e.distanceToSquared(n.centroid,t);r<u&&(!o||e.isVectorInPolygon(t,n,i))&&(s=n,u=r)}),s},u.prototype.findPath=function(e,t,r,o){var s=this.zones[r].groups[o],u=this.zones[r].vertices,c=this.getClosestNode(e,r,o,!0),h=this.getClosestNode(t,r,o,!0);if(!c||!h)return null;var a=n.search(s,c,h),d=function(e,t){for(var n=0;n<e.neighbours.length;n++)if(e.neighbours[n]===t.id)return e.portals[n]},f=new i;f.push(e);for(var v=0;v<a.length;v++){var l=a[v+1];if(l){var p=d(a[v],l);f.push(u[p[0]],u[p[1]])}}f.push(t),f.stringPull();var g=f.path.map(function(e){return new THREE.Vector3(e.x,e.y,e.z)});return g.shift(),g},u.prototype.getGroup=(s=new THREE.Plane,function(t,n,r){if(void 0===r&&(r=!1),!this.zones[t])return null;for(var o=null,i=Infinity,u=this.zones[t],c=0;c<u.groups.length;c++)for(var h=0,a=u.groups[c];h<a.length;h+=1){var d=a[h];if(r&&(s.setFromCoplanarPoints(u.vertices[d.vertexIds[0]],u.vertices[d.vertexIds[1]],u.vertices[d.vertexIds[2]]),Math.abs(s.distanceToPoint(n))<1e-4&&e.isPointInPoly([u.vertices[d.vertexIds[0]],u.vertices[d.vertexIds[1]],u.vertices[d.vertexIds[2]]],n)))return c;var f=e.distanceToSquared(d.centroid,n);f<i&&(o=c,i=f)}return o}),u.prototype.clampStep=function(){var e,t,n=new THREE.Vector3,r=new THREE.Plane,o=new THREE.Triangle,i=new THREE.Vector3;return function(s,u,c,h,a,d){var f=this.zones[h].vertices,v=this.zones[h].groups[a],l=[c],p={};p[c.id]=0,e=void 0,i.set(0,0,0),t=Infinity,r.setFromCoplanarPoints(f[c.vertexIds[0]],f[c.vertexIds[1]],f[c.vertexIds[2]]),r.projectPoint(u,n),u.copy(n);for(var g=l.pop();g;g=l.pop()){o.set(f[g.vertexIds[0]],f[g.vertexIds[1]],f[g.vertexIds[2]]),o.closestPointToPoint(u,n),n.distanceToSquared(u)<t&&(e=g,i.copy(n),t=n.distanceToSquared(u));var x=p[g];if(!(x>2))for(var I=0;I<g.neighbours.length;I++){var y=v[g.neighbours[I]];y.id in p||(l.push(y),p[y.id]=x+1)}}return d.copy(i),e}}(),exports.Pathfinding=u;
//# sourceMappingURL=three-pathfinding.js.map
