/*

@name: 			PhotoGrids version 0.1
@author(s):		gagan-preet (theDeparted)
@created:		19-Oct-2012
@updated:		21-Oct-2012
@license:		GNU GENERAL PUBLIC LICENSE (Version 3)

@requires: 		JQuery (Essential)
				JQuery-UI (For transition effects)

Supported Styles:
		>	photoMatrix

*/
// Config Variables
	var r		= 4;		//	Number of Rows
	var c		= 4;		//	Number of Columns
	var cor		= 30;		//	Dimension of Corner Division
	var w		= 200;		//	Width of Images (and Divisions)
	var h		= 100;		//	Height of the Images (and Divisions)
	var time	= 250;		//	Transition Time in ms
	var max		= 21;		//	Number of Images in Bank
	var div		= 'grid';	//	Name of Division working with
	var path	= '';		//	Path of the Images
	var ext		= '.jpg';	//	Extension of the Images
	var styles	= Array(	//	Styles for Transition
						'easeOutBounce',
						'easeInCirc',
						'easeOutCirc',
						'easeInOutExpo',
						'easeOutBack',
						'easeOutElastic',
						'easeInOutElastic',
						'linear'
					);

// Non Config Variables
	var k		= 0;		//	Indexing Variable
	var i		= r*c + 3;	//	Indexing Variable
	var j		= 0;		//	Indexing Variable
	var a,b,n;				//	Switching Variables
	var style	= styles[Math.floor(styles.length*Math.random())];

function photo_matrix(d1,d2,d3,d4,d5,d6,d7,d8,d9,d10)
{
	r 	= d1;
	c 	= d2;
	cor = d3;
	w	= d4;
	h	= d5;
	time= d6;
	max = d7;
	div = d8;
	path= d9;
	ext = d10;
	begin();
}

function loc(idx)
{
	while(idx>max)
	{
		idx -= max;
	}
	while(idx<0)
	{
		idx += max;
	}
	return "<img src=\'"+path+idx+ext+"\' width=\'"+w+"px\' height=\'"+h+"px\'>";
}

function begin()
{
	$('.'+div).css('border-radius',cor/2+'px')
			.css('width',(2*cor+c*w)+'px')
			.css('height',(2*cor+r*h)+'px');
	for(j = 1; j <= 4; j++)
	{
		$('.'+div).prepend('<div class = \'corner_button\' id=\'c'+j+'\'></div>');
	}
	for(j = 0; j < 2; j++)
	{
		for(k = 0; k < 2; k++)
		{
			$('#c'+(2*j+k+1)).css('margin-top',(cor+h*r)*j+'px')
					.css('margin-left',(cor+w*c)*k+'px');
		}
	}
	for(j = 0; j < c; j++)
	{
		$('.'+div).prepend('<div class = \'up_button\' id=\'u'+(j+1)+'\' onclick=\'up('+(j+1)+')\'></div>');
		$('#u'+(j+1)).css('margin-top','0px')
				.css('margin-left',(cor+j*w)+'px');
		$('.'+div).prepend('<div class = \'down_button\' id=\'d'+(j+1)+'\' onclick=\'down('+(j+1)+')\'></div>');
		$('#d'+(j+1)).css('margin-top',(cor+r*h)+'px')
				.css('margin-left',(cor+j*w)+'px');
	}
	for(j = 0; j < r; j++)
	{
		$('.'+div).prepend('<div class = \'left_button\' id=\'l'+(j+1)+'\' onclick=\'left('+(j+1)+')\'></div>');
		$('#l'+(j+1)).css('margin-top',(cor+j*h)+'px')
				.css('margin-left','0px');
		$('.'+div).prepend('<div class = \'right_button\' id=\'r'+(j+1)+'\' onclick=\'right('+(j+1)+')\'></div>');
		$('#r'+(j+1)).css('margin-top',(cor+j*h)+'px')
				.css('margin-left',(cor+c*w)+'px');
	}
	for(j = 0; j < r; j++)
	{
		for(k = 0; k < c; k++)
		{
			$('.'+div).prepend("<div class=\'pic\' id=\'p"+(j*c+k+1)+"\'>"+loc(j*c+k+1)+"</div>");
			$('#p'+(j*c+k+1)).css('margin-top',(cor+j*h)+'px');
			$('#p'+(j*c+k+1)).css('margin-left',(cor+k*w)+'px');
		}
	}
	for(j = r*c+1; j < r*c+5; j++)
	{
		$('.'+div).prepend("<div class=\'hide\' id=\'p"+j+"\'>"+loc(j)+"</div>");
	}
	$('.corner_button').css('width',cor+'px');
	$('.corner_button').css('height',cor+'px');
	$('.corner_button').css('border-radius',cor+'px');
	$('.down_button').css('width',w+'px');
	$('.down_button').css('height',cor+'px');
	$('.down_button').css('border-bottom-left-radius',cor/2+'px');
	$('.down_button').css('border-bottom-right-radius',cor/2+'px');
	$('.up_button').css('width',w+'px');
	$('.up_button').css('height',cor+'px');
	$('.up_button').css('border-top-left-radius',cor/2+'px');
	$('.up_button').css('border-top-right-radius',cor/2+'px');
	$('.left_button').css('width',cor+'px');
	$('.left_button').css('height',h+'px');
	$('.left_button').css('border-bottom-left-radius',cor/2+'px');
	$('.left_button').css('border-top-left-radius',cor/2+'px');
	$('.right_button').css('width',cor+'px');
	$('.right_button').css('height',h+'px');
	$('.right_button').css('border-bottom-right-radius',cor/2+'px');
	$('.right_button').css('border-top-right-radius',cor/2+'px');
}

function up(num)
{
	style = styles[Math.floor(styles.length*Math.random())];
	$('#p'+(num)).animate({"height":"0px"}, time, style);
	for(j = 1; j < r; j++)
	{
		$('#p'+(num+j*c)).animate({"margin-top":(cor+h*(j-1))+"px"}, time, style);
	}
	$('#p'+(r*c+1)).css("margin-top",(r*h+cor)+"px")
			.css("margin-left",(cor+(num-1)*w)+"px")
			.css("height","0px")
			.css("display","block")
			.animate({"margin-top":(cor+(r-1)*h)+"px","height":h+"px"}, time, style);
	setTimeout(function()
	{
		for(j = 1; j < r; j++)
		{
			a = $('#p'+(num+c*j)).html();
			b = $('#p'+(num+c*(j-1))).html(a);
			$('#p'+(num+c*j)).css("margin-top",(cor+j*h)+"px");
		}
		a = $('#p'+(r*c+1)).html();
		b = $('#p'+(num+(r-1)*c)).html(a);
		$('#p'+(num)).css("height",h+"px");
		$('#p'+(r*c+1)).css("display","none");
	}, time+10);
	rejuvinate();
}

function down(num)
{
	style = styles[Math.floor(styles.length*Math.random())];
	$('#p'+(num+((r-1)*c))).animate({"margin-top":(cor+r*h)+"px","height":"0px"}, time, style);
	for(j = 1; j < r; j++)
	{
		$('#p'+(num+(j-1)*c)).animate({"margin-top":(cor+j*h)+"px"}, time, style);
	}
	$('#p'+(r*c+1)).css("margin-top",cor+"px")
			.css("margin-left",(cor+(num-1)*w)+"px")
			.css("height","0px")
			.css("display","block")
			.animate({"height":h+"px"}, time, style);
	setTimeout(function()
	{
		for(j = r-1; j >= 0; j--)
		{
			a = $('#p'+(num+c*(j-1))).html();
			b = $('#p'+(num+c*j)).html(a);
			$('#p'+(num+c*j)).css("margin-top",(cor+j*h)+"px");
		}
		a = $('#p'+(r*c+1)).html();
		b = $('#p'+(num)).html(a);
		$('#p'+(num+(r-1)*c)).css("height",h+"px");
		$('#p'+(r*c+1)).css("display","none");
	}, time+10);
	rejuvinate();
}

function left(num)
{
	n = c*(num-1);
	style = styles[Math.floor(styles.length*Math.random())];
	$('#p'+(n+1)).animate({"width":"0px"}, time, style);
	for(j = 1; j < c; j++)
	{
		$('#p'+(n+j+1)).animate({"margin-left":(cor+(j-1)*w)+"px"}, time, style);
	}
	$('#p'+(r*c+1)).css("margin-top",(cor+h*(num-1))+"px")
			.css("margin-left",(cor+c*w)+"px")
			.css("width","0px")
			.css("display","block")
			.animate({"width":w+"px","margin-left":(cor+(c-1)*w)+"px"}, time, style);
	setTimeout(function()
	{
		for(j = 1; j < c; j++)
		{
			a = $('#p'+(n+j+1)).html();
			b = $('#p'+(n+j)).html(a);
			$('#p'+(n+j+1)).css("margin-left",(30+j*w)+"px");
		}
		a = $('#p'+(r*c+1)).html();
		b = $('#p'+(n+c)).html(a);
		$('#p'+(n+1)).css("width",w+"px");
		$('#p'+(r*c+1)).css("display","none");
	}, time+10);
	rejuvinate();
}

function right(num)
{
	n = c*(num - 1);
	style = styles[Math.floor(styles.length*Math.random())];
	$('#p'+(n+c)).animate({"width":"0px", "margin-left":(cor+c*w)+"px"}, time, style);
	for(j = 1; j < c; j++)
	{
		$('#p'+(n+j)).animate({"margin-left":(cor+w*j)+"px"}, time, style);
	}
	$('#p'+(r*c+1)).css("margin-top",(cor+(h*(num-1)))+"px")
				.css("margin-left",cor+"px")
				.css("width","0px")
				.css("display","block")
				.animate({"width":w+"px"}, time, style);
	setTimeout(function()
	{
		for(j = c-1; j >= 1; j--)
		{
			a = $('#p'+(n+j)).html();
			b = $('#p'+(n+j+1)).html(a);
			$('#p'+(n+j+1)).css("margin-left",(cor+j*w)+"px");
		}
		$('#p'+(n+1)).css("margin-left",(cor)+"px");
		a = $('#p'+(r*c+1)).html();
		b = $('#p'+(n+1)).html(a);
		$('#p'+(n+c)).css("width",w+"px");
		$('#p'+(r*c+1)).css("display","none");
	}, time+10);
	rejuvinate();
}

function rejuvinate()
{
	a = $('#p'+(r*c+2)).html();
	b = $('#p'+(r*c+1)).html(a);
	a = $('#p'+(r*c+3)).html();
	b = $('#p'+(r*c+2)).html(a);
	a = loc(i+1);
	b = $('#p'+(r*c+3)).html(a);
	i = i + 1;
}