/*

@name: 			PhotoGrids version 0.2
@author(s):		gagan-preet (theDeparted)
@created:		19-Oct-2012
@updated:		22-Oct-2012
@license:		GNU GENERAL PUBLIC LICENSE (Version 3)

@requires: 		JQuery (Essential)
				JQuery-UI (For transition effects)

Supported Styles:
		>	photoMatrix

*/

function photoMatrix(nm)
{
	return {
	
	// Config Variables
		r		: 0,		//	Number of Rows
		c		: 0,		//	Number of Columns
		cor		: 0,		//	Dimension of Corner Division
		w		: 0,		//	Width of Images (and Divisions)
		h		: 0,		//	Height of the Images (and Divisions)
		time	: 0,		//	Transition Time in ms
		max		: 0,		//	Number of Images in Bank
		div		: '',	//	Name of Division working with
		path	: '',		//	Path of the Images
		ext		: '',	//	Extention of the Images
		styles	: [			//	Styles for Transition
						'easeOutBounce',
						'easeInCirc',
						'easeOutCirc',
						'easeInOutExpo',
						'easeOutBack',
						'easeOutElastic',
						'easeInOutElastic',
						'linear'
					],
		name	: nm,
	
	// Non Config Variables
		k		: 0,		//	Indexing Variable
		i		: 0,		//	Indexing Variable
		j		: 0,		//	Indexing Variable
		style	: '',		//	Switching Variables
	
	// Functions
		init    : function(d1,d2,d3,d4,d5,d6,d7,d8,d9,d10)
				{
					this.r 	= d1;
					this.c 	= d2;
					this.cor = d3;
					this.w	= d4;
					this.h	= d5;
					this.time= d6;
					this.max = d7;
					this.div = d8;
					this.path= d9;
					this.ext = d10;
					this.i 	= this.r*this.c + 3;
					this.begin();
					return this;
				},
	
		loc		: function(idx)
				{
					while(idx>this.max)
					{
						idx -= this.max;
					}
					while(idx<0)
					{
						idx += this.max;
					}
					return "<img src=\'"+this.path+idx+this.ext+"\' width=\'"+this.w+"px\' height=\'"+this.h+"px\'>";
					return this;
				},
	
		begin	: function()
				{
					$('.'+this.div).css('border-radius',this.cor/2+'px')
							.css('width',(2*this.cor+this.c*this.w)+'px')
							.css('height',(2*this.cor+this.r*this.h)+'px');
					for( var j = 1; j <= 4; j++)
					{
						$('.'+this.div).prepend('<div class = \'corner_button '+this.name+'corner_button\' id=\''+this.name+'c'+j+'\'></div>');
					}
					for( var j = 0; j < 2; j++)
					{
						for( var k = 0; k < 2; k++)
						{
							$('#'+this.name+'c'+(2*j+k+1)).css('margin-top',(this.cor+this.h*this.r)*j+'px')
									.css('margin-left',(this.cor+this.w*this.c)*k+'px');
						}
					}
					for( var j = 0; j < this.c; j++)
					{
						$('.'+this.div).prepend('<div class = \'up_button '+this.name+'up_button\' id=\''+this.name+'u'+(j+1)+'\' onclick=\''+this.name+'.up('+(j+1)+')\'></div>');
						$('#'+this.name+'u'+(j+1)).css('margin-top','0px')
								.css('margin-left',(this.cor+j*this.w)+'px');
						$('.'+this.div).prepend('<div class = \'down_button '+this.name+'down_button\' id=\''+this.name+'d'+(j+1)+'\' onclick=\''+this.name+'.down('+(j+1)+')\'></div>');
						$('#'+this.name+'d'+(j+1)).css('margin-top',(this.cor+this.r*this.h)+'px')
								.css('margin-left',(this.cor+j*this.w)+'px');
					}
					for( var j = 0; j < this.r; j++)
					{
						$('.'+this.div).prepend('<div class = \'left_button '+this.name+'left_button\' id=\''+this.name+'l'+(j+1)+'\' onclick=\''+this.name+'.left('+(j+1)+')\'></div>');
						$('#'+this.name+'l'+(j+1)).css('margin-top',(this.cor+j*this.h)+'px')
								.css('margin-left','0px');
						$('.'+this.div).prepend('<div class = \'right_button '+this.name+'right_button\' id=\''+this.name+'r'+(j+1)+'\' onclick=\''+this.name+'.right('+(j+1)+')\'></div>');
						$('#'+this.name+'r'+(j+1)).css('margin-top',(this.cor+j*this.h)+'px')
								.css('margin-left',(this.cor+this.c*this.w)+'px');
					}
					for( var j = 0; j < this.r; j++)
					{
						for( var k = 0; k < this.c; k++)
						{
							$('.'+this.div).prepend("<div class=\'pic\' id=\'"+this.name+"p"+(j*this.c+k+1)+"\'>"+this.loc(j*this.c+k+1)+"</div>");
							$('#'+this.name+'p'+(j*this.c+k+1)).css('margin-top',(this.cor+j*this.h)+'px');
							$('#'+this.name+'p'+(j*this.c+k+1)).css('margin-left',(this.cor+k*this.w)+'px');
						}
					}
					for( var j = this.r*this.c+1; j < this.r*this.c+4; j++)
					{
						$('.'+this.div).prepend("<div class=\'hide\' id=\'"+this.name+"p"+j+"\'>"+this.loc(j)+"</div>");
					}
					$('.'+this.name+'corner_button').css('width',this.cor+'px');
					$('.'+this.name+'corner_button').css('height',this.cor+'px');
					$('.'+this.name+'corner_button').css('border-radius',this.cor+'px');
					$('.'+this.name+'down_button').css('width',this.w+'px');
					$('.'+this.name+'down_button').css('height',this.cor+'px');
					$('.'+this.name+'down_button').css('border-bottom-left-radius',this.cor/2+'px');
					$('.'+this.name+'down_button').css('border-bottom-right-radius',this.cor/2+'px');
					$('.'+this.name+'up_button').css('width',this.w+'px');
					$('.'+this.name+'up_button').css('height',this.cor+'px');
					$('.'+this.name+'up_button').css('border-top-left-radius',this.cor/2+'px');
					$('.'+this.name+'up_button').css('border-top-right-radius',this.cor/2+'px');
					$('.'+this.name+'left_button').css('width',this.cor+'px');
					$('.'+this.name+'left_button').css('height',this.h+'px');
					$('.'+this.name+'left_button').css('border-bottom-left-radius',this.cor/2+'px');
					$('.'+this.name+'left_button').css('border-top-left-radius',this.cor/2+'px');
					$('.'+this.name+'right_button').css('width',this.cor+'px');
					$('.'+this.name+'right_button').css('height',this.h+'px');
					$('.'+this.name+'right_button').css('border-bottom-right-radius',this.cor/2+'px');
					$('.'+this.name+'right_button').css('border-top-right-radius',this.cor/2+'px');
					return this;
				},
	
		up		: function(num)
				{
					var a,b;
					var r = this.r;
					var c = this.c;
					var name = this.name;
					var h = this.h;
					var w = this.w;
					var cor = this.cor;
					this.style = this.styles[Math.floor(this.styles.length*Math.random())];
					$('#'+this.name+'p'+(num)).animate({"height":"0px"}, this.time, this.style);
					for( var j = 1; j < this.r; j++)
					{
						$('#'+this.name+'p'+(num+j*this.c)).animate({"margin-top":(this.cor+this.h*(j-1))+"px"}, this.time, this.style);
					}
					$('#'+this.name+'p'+(this.r*this.c+1)).css("margin-top",(this.r*this.h+this.cor)+"px")
							.css("margin-left",(this.cor+(num-1)*this.w)+"px")
							.css("height","0px")
							.css("display","block")
							.animate({"margin-top":(this.cor+(this.r-1)*this.h)+"px","height":this.h+"px"}, this.time, this.style);
					setTimeout(function()
					{
						for( var k = 1; k < r; k++)
						{
							a = $('#'+name+'p'+(num+c*k)).html();
							b = $('#'+name+'p'+(num+c*(k-1))).html(a);
							$('#'+name+'p'+(num+c*(k-1))).css("margin-top",(cor+(k-1)*h)+"px");
						}
						a = $('#'+name+'p'+(r*c+1)).html();
						b = $('#'+name+'p'+(num+(r-1)*c)).html(a);
						$('#'+name+'p'+(num+c*(r-1))).css("margin-top",(cor+(r-1)*h)+"px");
						$('#'+name+'p'+(num)).css("height",h+"px");
						$('#'+name+'p'+(r*c+1)).css("display","none");
					}, this.time+10);
					this.rejuvinate();
					return this;
				},
	
		down	: function(num)
				{
					var a,b;
					var r = this.r;
					var c = this.c;
					var name = this.name;
					var h = this.h;
					var w = this.w;
					var cor = this.cor;
					this.style = this.styles[Math.floor(this.styles.length*Math.random())];
					$('#'+this.name+'p'+(num+((this.r-1)*this.c))).animate({"margin-top":(this.cor+this.r*this.h)+"px","height":"0px"}, this.time, this.style);
					for( var j = 1; j < this.r; j++)
					{
						$('#'+this.name+'p'+(num+(j-1)*this.c)).animate({"margin-top":(this.cor+j*this.h)+"px"}, this.time, this.style);
					}
					$('#'+this.name+'p'+(this.r*this.c+1)).css("margin-top",this.cor+"px")
							.css("margin-left",(this.cor+(num-1)*this.w)+"px")
							.css("height","0px")
							.css("display","block")
							.animate({"height":this.h+"px"}, this.time, this.style);
					setTimeout(function()
					{
						for( var k = r-1; k > 0; k--)
						{
							a = $('#'+name+'p'+(num+c*(k-1))).html();
							b = $('#'+name+'p'+(num+c*k)).html(a);
							$('#'+name+'p'+(num+c*k)).css("margin-top",(cor+k*h)+"px");
						}
						a = $('#'+name+'p'+(r*c+1)).html();
						b = $('#'+name+'p'+(num)).html(a);
						$('#'+name+'p'+(num)).css("margin-top",(cor)+"px");
						$('#'+name+'p'+(num+(r-1)*c)).css("height",h+"px");
						$('#'+name+'p'+(r*c+1)).css("display","none");
					}, this.time+10);
					this.rejuvinate();
					return this;
				},
	
		left	: function(num)
				{
					var a,b;
					var r = this.r;
					var c = this.c;
					var name = this.name;
					var h = this.h;
					var w = this.w;
					var cor = this.cor;
					var n = this.c*(num-1);
					this.style = this.styles[Math.floor(8*Math.random())];
					$('#'+this.name+'p'+(n+1)).animate({"width":"0px"}, this.time, this.style);
					for( var j = 1; j < this.c; j++)
					{
						$('#'+this.name+'p'+(n+j+1)).animate({"margin-left":(this.cor+(j-1)*this.w)+"px"}, this.time, this.style);
					}
					$('#'+this.name+'p'+(this.r*this.c+1)).css("margin-top",(this.cor+this.h*(num-1))+"px")
							.css("margin-left",(this.cor+this.c*this.w)+"px")
							.css("width","0px")
							.css("display","block")
							.animate({"width":this.w+"px","margin-left":(this.cor+(this.c-1)*this.w)+"px"}, this.time, this.style);
					setTimeout(function()
					{
						for( var k = 1; k < c; k++)
						{
							a = $('#'+name+'p'+(n+k+1)).html();
							b = $('#'+name+'p'+(n+k)).html(a);
							$('#'+name+'p'+(n+k)).css("margin-left",(cor+(k-1)*w)+"px");
						}
						a = $('#'+name+'p'+(r*c+1)).html();
						b = $('#'+name+'p'+(n+c)).html(a);
						$('#'+name+'p'+(n+c)).css("margin-left",(cor+(c-1)*w)+"px");
						$('#'+name+'p'+(n+1)).css("width",w+"px");
						$('#'+name+'p'+(r*c+1)).css("display","none");
					}, this.time+10);
					this.rejuvinate();
					return this;
				},
	
		right	: function(num)
				{
					var a,b;
					var r = this.r;
					var c = this.c;
					var name = this.name;
					var h = this.h;
					var w = this.w;
					var cor = this.cor;
					n = this.c*(num - 1);
					this.style = this.styles[Math.floor(8*Math.random())];
					$('#'+this.name+'p'+(n+this.c)).animate({"width":"0px", "margin-left":(this.cor+this.c*this.w)+"px"}, this.time, this.style);
					for( var j = 1; j < this.c; j++)
					{
						$('#'+this.name+'p'+(n+j)).animate({"margin-left":(this.cor+this.w*j)+"px"}, this.time, this.style);
					}
					$('#'+this.name+'p'+(this.r*this.c+1)).css("margin-top",(this.cor+(this.h*(num-1)))+"px")
								.css("margin-left",this.cor+"px")
								.css("width","0px")
								.css("display","block")
								.animate({"width":this.w+"px"}, this.time, this.style);
					setTimeout(function()
					{
						for( var k = c-1; k >= 1; k--)
						{
							a = $('#'+name+'p'+(n+k)).html();
							b = $('#'+name+'p'+(n+k+1)).html(a);
							$('#'+name+'p'+(n+k+1)).css("margin-left",(cor+k*w)+"px");
						}
						$('#'+name+'p'+(n+1)).css("margin-left",(cor)+"px");
						a = $('#'+name+'p'+(r*c+1)).html();
						b = $('#'+name+'p'+(n+1)).html(a);
						$('#'+name+'p'+(n+c)).css("width",w+"px");
						$('#'+name+'p'+(r*c+1)).css("display","none");
					}, this.time+10);
					this.rejuvinate();
					return this;
				},
	
		rejuvinate : function()
						{
							var a,b;
							a = $('#'+this.name+'p'+(this.r*this.c+2)).html();
							b = $('#'+this.name+'p'+(this.r*this.c+1)).html(a);
							a = $('#'+this.name+'p'+(this.r*this.c+3)).html();
							b = $('#'+this.name+'p'+(this.r*this.c+2)).html(a);
							a = this.loc(this.i+1);
							b = $('#'+this.name+'p'+(this.r*this.c+3)).html(a);
							this.i = this.i + 1;
							return this;
						}
	}
}