const url = require('path');
const path = require('path');
const assert = require('assert');
const cmacc = require('cmacc-compiler');

describe('helpers_section', function () {

  global.fs = require('fs');
  global.fetch = require('node-fetch');

  const opts = {
    base: __dirname
  };

  it('DynamicNum', function () {
    const file = url.join('file://', __dirname, '/DynamicNum.cmacc');

    return cmacc.compile(file, opts)
      .then(ast => {
        assert.equal(ast.xNum, "x");
        assert.equal(ast.xNumSec, "{{xNum}}.x");

        return ast;
      })
      .then(cmacc.render)
      .then(x => {
        return cmacc.remarkable.render(x)
      })
      .then(html => {
        const expect = '<h1>1 Test</h1>\n<h2>1.1 Test</h2>\n<h2>1.2 Test</h2>\n<h2>1.3 Test</h2>\n';
        assert.equal(html, expect);
      })

  });

  it('DynamicNumOverwrite', function () {
    const file = url.join('file://', __dirname, '/DynamicNumOverwrite.cmacc');

    return cmacc.compile(file, opts)
      .then(ast => {
        assert.equal(ast.xNum, "x");
        assert.equal(ast.doc.xNumSec, "{{xNum}}.x");

        return ast;
      })
      .then(cmacc.render)
      .then(x => {
        return cmacc.remarkable.render(x)
      })
      .then(html => {
        const expect = '<h1>1 Header</h1>\n<h1>1.1 Test</h1>\n<h2>1.1.1 Test</h2>\n<h2>1.1.2 Test</h2>\n<h2>1.1.3 Test</h2>\n';
        assert.equal(html, expect);
      })

  });
  it('CrossReference', function () {
    const file = url.join('file://', __dirname, '/CrossReference.cmacc');

    return cmacc.compile(file, opts)
      .then(cmacc.render)
      .then(x => {
        return cmacc.remarkable.render(x)
      })
      .then(html => {
        const expect = `<h1>1 Cross reference</h1>
<h1>2 Who</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed laoreet tellus. In in facilisis orci, varius pulvinar arcu. Vivamus laoreet tortor in erat placerat malesuada. In hac habitasse platea dictumst. Vivamus sit amet sem molestie, rhoncus ipsum at, elementum risus. Vivamus vel convallis nibh. Sed pharetra libero suscipit viverra tincidunt. Donec blandit erat tellus, nec luctus dui aliquam vel.</p>
<h1>2.1 Party 1</h1>
<p>Nunc auctor ligula porta, porttitor lacus et, consectetur risus. Etiam pulvinar leo at nisl ornare congue aliquam id ex. Proin efficitur ligula vitae sapien sodales, non viverra urna placerat. Suspendisse molestie volutpat mi ac tempus. Curabitur quis libero nisl. Vestibulum et mauris purus. Donec non turpis dui. In hac habitasse platea dictumst. Nam laoreet, tellus vitae pulvinar ultricies, orci est dictum lorem, a ultricies nisi purus sit amet tortor. Vivamus ornare vestibulum luctus. Morbi consequat dignissim risus, eu gravida augue gravida nec. In facilisis felis ante, ac porttitor justo lobortis sit amet. Maecenas sit amet mollis urna, id facilisis nulla. Morbi lectus dolor, suscipit sed fermentum at, facilisis ac urna. Maecenas accumsan, libero id vulputate dapibus, diam nulla rutrum justo, at ullamcorper purus dolor vel nisl. Integer nisi lorem, tincidunt in dapibus sed, varius eu felis.</p>
<h2>2.2 Party 2</h2>
<p>Nulla feugiat rutrum ante, dapibus iaculis ante. Donec vulputate massa quis dolor facilisis, finibus luctus erat tempor. Quisque mollis nunc vitae nunc tincidunt, at suscipit velit auctor. Sed euismod, libero eu vehicula ultricies, ante ex viverra metus, in molestie ex ipsum sed nunc. In hac habitasse platea dictumst. Phasellus urna velit, laoreet quis erat quis, pellentesque tempor leo. In laoreet, sapien vitae pretium vehicula, nulla nunc cursus tortor, vel cursus lacus ipsum ut nunc. Morbi nibh metus, tincidunt at congue vel, gravida quis augue. Vivamus tristique vestibulum fermentum. Nulla sollicitudin risus ligula, vitae dapibus mauris viverra sit amet. Mauris eu lacinia sapien. Cras ac velit vitae dui pellentesque luctus a sed diam. Donec tempus suscipit felis, vitae tristique ipsum. In pretium eget ante eget consequat.</p>
<h3>2.2.1 Location</h3>
<p>Ut vitae eros sed purus porta suscipit. In hac habitasse platea dictumst. Nulla aliquet, diam eu eleifend rutrum, nibh erat bibendum metus, eu faucibus nunc libero auctor metus. Praesent convallis convallis sodales. Integer volutpat condimentum placerat. Morbi odio diam, semper eu pellentesque eget, placerat sit amet enim. Aliquam euismod sem vitae ipsum dignissim, eu luctus justo volutpat. Proin in mi mi. Aliquam congue tincidunt felis ultricies lacinia. Cras eget justo gravida, lobortis nulla id, lobortis mauris. Curabitur interdum urna erat, id molestie urna elementum hendrerit. Vestibulum vitae pulvinar orci. Suspendisse potenti. Etiam non arcu metus. Mauris vitae ornare urna. Duis dapibus massa sed dolor feugiat rhoncus.</p>
<h3>2.2.2 Background</h3>
<p>Pellentesque quis purus enim. Donec fringilla, diam eu efficitur imperdiet, eros sem sagittis urna, sed fringilla nisi libero a tortor. Nunc vel placerat felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent tempor sapien ex, quis sollicitudin lectus volutpat eu. In a ligula in tortor efficitur posuere. Mauris viverra odio ut neque venenatis, vel dapibus tortor rutrum. Phasellus quis mauris lacus. Suspendisse potenti. Praesent ullamcorper magna lectus, luctus elementum arcu mattis eget.</p>
<h1>3 What</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin quam non mauris mattis mollis. Curabitur id elit pellentesque, varius ex eget, rhoncus magna. Aliquam feugiat metus in purus scelerisque accumsan. Suspendisse in porta nulla. Donec feugiat dui eget velit imperdiet, non dignissim diam convallis. Etiam ac accumsan urna. Sed elit eros, tincidunt non pharetra ac, blandit sed mi. Aliquam magna eros, hendrerit sit amet turpis quis, cursus facilisis orci. Duis ultricies erat nisl, at scelerisque ante aliquet a. Phasellus viverra suscipit nibh, quis imperdiet elit sodales non. Praesent eget nisi volutpat, tristique tellus eu, eleifend sapien. Integer tristique sem lacinia condimentum rhoncus. Phasellus ultricies sem quis enim consequat eleifend at sed lectus. Mauris sed ligula a odio pharetra ornare non quis nisi.</p>
<h2>3.1 Location 1</h2>
<p>Cras ac ante faucibus elit vestibulum tincidunt eget id ex. Nulla justo dui, dignissim at nisl sed, facilisis congue lectus. Suspendisse a elit et ante laoreet faucibus. Nam consectetur nunc vel lectus consequat pharetra. Pellentesque nibh mi, eleifend sed felis sed, eleifend egestas ante. Integer molestie venenatis odio. Cras suscipit ipsum quis venenatis ornare. Ut rhoncus cursus risus, ut sodales diam aliquet ac.</p>
<h2>3.2 Location 2</h2>
<p>Mauris dui metus, consectetur at imperdiet in, imperdiet sagittis mauris. Fusce lectus est, facilisis quis tempor sit amet, tempor ac nisl. Proin lobortis risus sem, vitae maximus diam auctor ut. Nullam consectetur lacus id nulla gravida scelerisque sed eget leo. Mauris ut augue ullamcorper, lobortis est vel, mollis dui. Praesent nec rhoncus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit est, tincidunt a viverra id, facilisis ac nisi. Suspendisse consectetur lacus et dui tempor, non tempus lectus varius. Nullam porttitor sodales volutpat. Nunc pulvinar sodales ornare.</p>
<h2>4.3 Location 3</h2>
<p>Mauris dui metus, consectetur at imperdiet in, imperdiet sagittis mauris. Fusce lectus est, facilisis quis tempor sit amet, tempor ac nisl. Proin lobortis risus sem, vitae maximus diam auctor ut. Nullam consectetur lacus id nulla gravida scelerisque sed eget leo. Mauris ut augue ullamcorper, lobortis est vel, mollis dui. Praesent nec rhoncus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit est, tincidunt a viverra id, facilisis ac nisi. Suspendisse consectetur lacus et dui tempor, non tempus lectus varius. Nullam porttitor sodales volutpat. Nunc pulvinar sodales ornare.</p>
<h1>4 What</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin quam non mauris mattis mollis. Curabitur id elit pellentesque, varius ex eget, rhoncus magna. Aliquam feugiat metus in purus scelerisque accumsan. Suspendisse in porta nulla. Donec feugiat dui eget velit imperdiet, non dignissim diam convallis. Etiam ac accumsan urna. Sed elit eros, tincidunt non pharetra ac, blandit sed mi. Aliquam magna eros, hendrerit sit amet turpis quis, cursus facilisis orci. Duis ultricies erat nisl, at scelerisque ante aliquet a. Phasellus viverra suscipit nibh, quis imperdiet elit sodales non. Praesent eget nisi volutpat, tristique tellus eu, eleifend sapien. Integer tristique sem lacinia condimentum rhoncus. Phasellus ultricies sem quis enim consequat eleifend at sed lectus. Mauris sed ligula a odio pharetra ornare non quis nisi.</p>
<h2>4.1 Location 1</h2>
<p>Cras ac ante faucibus elit vestibulum tincidunt eget id ex. Nulla justo dui, dignissim at nisl sed, facilisis congue lectus. Suspendisse a elit et ante laoreet faucibus. Nam consectetur nunc vel lectus consequat pharetra. Pellentesque nibh mi, eleifend sed felis sed, eleifend egestas ante. Integer molestie venenatis odio. Cras suscipit ipsum quis venenatis ornare. Ut rhoncus cursus risus, ut sodales diam aliquet ac.</p>
<h2>4.2 Location 2</h2>
<p>Mauris dui metus, consectetur at imperdiet in, imperdiet sagittis mauris. Fusce lectus est, facilisis quis tempor sit amet, tempor ac nisl. Proin lobortis risus sem, vitae maximus diam auctor ut. Nullam consectetur lacus id nulla gravida scelerisque sed eget leo. Mauris ut augue ullamcorper, lobortis est vel, mollis dui. Praesent nec rhoncus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit est, tincidunt a viverra id, facilisis ac nisi. Suspendisse consectetur lacus et dui tempor, non tempus lectus varius. Nullam porttitor sodales volutpat. Nunc pulvinar sodales ornare.</p>
<h2>4.4 Location 3</h2>
<p>Mauris dui metus, consectetur at imperdiet in, imperdiet sagittis mauris. Fusce lectus est, facilisis quis tempor sit amet, tempor ac nisl. Proin lobortis risus sem, vitae maximus diam auctor ut. Nullam consectetur lacus id nulla gravida scelerisque sed eget leo. Mauris ut augue ullamcorper, lobortis est vel, mollis dui. Praesent nec rhoncus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit est, tincidunt a viverra id, facilisis ac nisi. Suspendisse consectetur lacus et dui tempor, non tempus lectus varius. Nullam porttitor sodales volutpat. Nunc pulvinar sodales ornare.</p>
<p>This is an reference to who 2</p>
<p>This is an reference to what 3</p>
<p>This is an reference to whatSub 4.4</p>
`;
        assert.equal(html, expect);
      })

  });

});