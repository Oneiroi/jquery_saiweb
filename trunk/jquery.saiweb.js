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
	
})(jQuery);