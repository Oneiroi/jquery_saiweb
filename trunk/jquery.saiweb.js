/**
 * jquery.saiweb
 * 
 * This script is realy just a toolset I will build up as I need to, adding 'tool' functions.
 * ©2008 David Busby Saiweb.co.uk
 * @see http://creativecommons.org/licenses/by-nc-sa/2.0/uk
 * 
 */
(function($){
	/**
	 * Simple visible 'toggle'
	 * @param elem
	 * @param params
	 * @return
	 */
	function showhide(elem, params) {
		
		var opts = {
			anim: 'slow'
		};
		
		$.extend(opts, params);

		switch(elem.css('display')){
			case 'block':
				elem.hide(opts.anim);
			break;
			case 'none':
				elem.show(opts.anim);
			break;
			default:
				elem.show(opts.anim);
			break;
		}
	};
	
	/**
	 * typewriter animation function
	 * @param elem
	 * @param parms
	 */
	function typewriter(elem, params) {
	
		var opts = {
				delay: 150,
				pos: 0,
				text: ''
		};
		
		$.extend(opts, params);
		
		//slight optimization, takes the count our of the coming for loop
		var tlen = opts.text.length;
		
		if(tlen == 0) {
			//text not specified take .html()
			opts.text = elem.html();
			tlen = opts.text.length;
		}
		
		//make it blank
		elem.html('');
		//the loop
		for(i=opts.pos;i < tlen; i++){
			 setTimeout(function(){
				 //tried using i here but it's always the max number so opts.pos is used
				 elem.append(opts.text.charAt(opts.pos));
				 opts.pos++;
			 }, 
			 i*opts.delay
			 );
		}
		
	}
	
	/**
	 * decode animation function, animations for the duration param, then reveals corrects chars based on delay param
	 * Therefor total time = duration + (opts.text.length * delay);
	 * @param elem
	 * @param parms
	 */
	function decode(elem, params){
		
		var opts = {
				delay: 150,
				duration: 3000,
				text: ''
		};
		
		$.extend(opts, params);
		
		var tlen = opts.text.length; //text length
		var srand = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@$%^&*#'; //chars for rand
		var slen = srand.length; //total length of rand
		var rand = 0; //rand location
		var walk = 1; //walk var, indicates current valid placement
		var total = (opts.delay * tlen) + opts.duration; //total duration of animation
		var out = ''; //output string
		var tout = opts.delay;
		for(i=opts.delay; i<=total; i=i+opts.delay){
				//display just random text for the duration
				for(j=0; j < tlen; j++){
					rand = Math.floor(Math.random()*slen); //rand offset
					out = out + srand.charAt(rand); //rand char
				}
				j=0;
				setTimeout(
						function(){
									out = ''
									j=j+opts.delay;
									if(j <= opts.duration){
										for(k=0; k < tlen; k++){
											rand = Math.floor(Math.random()*slen); //rand offset
											out = out + srand.charAt(rand); //rand char
										}
									} else {
										//reveal valid
										for(k=0; k<walk; k++){
											out = out + opts.text.charAt(k);
										}
										//gen rand
										for(l=walk; k<tlen; k++){
											rand = Math.floor(Math.random()*slen);
											out = out + srand.charAt(rand);
										}
										walk++;
									}
									elem.html(out);
						},
						i);
		}
	}
	
	/**
	 * jQuery plugin hooks
	 */
	$.fn.showhide = function(params) {    
		showhide(this, params);		
		return this; 
	};
	
	$.fn.typewriter = function(params) {
		typewriter(this, params);
		return this;
	};
	
	$.fn.decode = function(params) {
		decode(this, params);
		return this;
	};
	
})(jQuery);