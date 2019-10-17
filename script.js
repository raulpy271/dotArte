
const $ = document.querySelector.bind(document);
const img = $ ('.img');
function test() {window.alert(1);}

//adicionando a imagem em <img> - adding the image to <img>
const fileChooser = $ ('.file-chooser');
fileChooser.onchange = e => {
  const fileToUpload = e.target.files.item(0);
  const reader = new FileReader();
  reader.onload = e => img.src = e.target.result;
  reader.readAsDataURL(fileToUpload);
};


//definindo nova dimensão - defining new dimension
function get_new_size(wdt, hgt, max_size) {
  var new_size = [0, 0]
  if (wdt > hgt) {
    new_size[1] = max_size;
    new_size[0] = Math.round(hgt / (wdt / max_size));
  } else { new_size[0] = 150; new_size[1] = Math.round(wdt / (hgt / max_size));}
  return new_size}


//creando o elemento <canvas> com a nova dimensão
//creating canvas element with new dimension
function create_canvas_image(image, wdt, hgt){
  var canvas = document.getElementById("canvas");
  canvas.width=size[1]; canvas.height=size[0]
  var ctx = canvas.getContext("2d"); 
  ctx.scale(size[1]/wdt,size[0]/hgt);
  ctx.drawImage(image, 0, 0); 
  var imgData = ctx.getImageData(0, 0, size[1], size[0]);
  tranversing_all_pixel(size[1], size[0], imgData.data);
}


//convertendo um pixel rgb para cinza - convert a array rgb to int in gray scale
function rgb2gray(array) {return  Math.round(( array[0] + array[1] + array[2] ) / 3)};

// percorrendo todos os pixels -traversing all pixels and added ascii art to html
function tranversing_all_pixel(wdth, hght, imgdata) {
  let i, ii;
  var p = '';
  //document.getElementById('test').innerHTML=imgdata;
  for (i = 0; i <= hght; i++) {
    p += '<br>';
    for (ii = 0; ii <= wdth*4; ii+=4) {
      var pixel = [ imgdata[(wdth * i *4) + ii], 
                   imgdata[(wdth * i *4) + ii + 1],
                   imgdata[(wdth * i *4) + ii + 2] ];
      pixel = rgb2gray(pixel);
      if (pixel < 50) {p += '#';}
      else if ( pixel < 100) {p += 'x';}
      else if ( pixel < 150) {p += '*';}
      else if (pixel < 200) {p += ':';}
      else {p += '.';}

    } 
  }  document.getElementById('ascii').innerHTML=p; 
}


function run() {
  const width = parseInt(img.width); //largura
	const height = parseInt(img.height);
  size = get_new_size(width, height, 200); 
  create_canvas_image(img, width, height)
  
}
