/*! Bob's Monospace Separator
* http://roberthuttonpeck.com
* Copyright Bob Peck; Licensed MIT 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

$.widget( "bob.monoSeparator", {
    options: {
        direction: 'horizontal',
        character: '&mdash;',
        sequence: 'after',
        append: 'false'
    },
    _create: function() {

        this.sizer;
        this.characterHeight;
        this.characterWidth;
        this.tempString;


        this._addHiddenCharacter();

        this.sizer = document.querySelector('.sizer').getBoundingClientRect();
        this.characterWidth = this.sizer.width;
        this.characterHeight = this.sizer.height;

        if (this.element == ''){
            console.log('Missing element for monoSeparator');
            return;
        }

        this.tempString = this._buildDiv();
        
        if (this.options.sequence != 'both'){
            (!this.options.append) ? 
                (this.options.sequence == 'after') ? this.element.after(this.tempString) : this.element.before(this.tempString): 
                (this.options.sequence == 'after') ? this.element.append(this.tempString) : this.element.prepend(this.tempString);
        } else {
            if (!this.options.append) {
                this.element.after(this.tempString);
                this.element.before(this.tempString);
            } else {
                this.element.append(this.tempString);
                this.element.prepend(this.tempString);
            }
        }
     },
    refresh: function() {
        this.tempString = this._buildString();
        (!this.options.append) ? 
            this.element.siblings('.monoSeparator').html(tempString): 
            this.element.find('.monoSeparator').html(this.tempString)
    },
    _addHiddenCharacter: function(){
        if ($('body').find('.monoSeparator.sizer').length < 1){
            $('body').append('<span class="sizer monoSeparator mono">-</span>');
        }
    },
    _buildString: function(){
        let tempString = '';
        let count; 

        count = (this.options.direction=='horizontal') ? 
            this.element.outerWidth()/this.characterWidth :
            this.element.outerHeight()/this.characterHeight;

        count = count-1;
        
        for(i=0; i<=count; i++) {
            tempString = tempString + this.options.character;
        }
        return tempString;
    },
    _buildDiv: function(){
        let characterString = this._buildString();
        return (this.options.direction == "vertical") ? 
            ("<div class='col monoSeparator"+ this.specialClass +"' style='width: "+characterWidth+"px; height: "+(characterHeight*this.count)+"px'>"+characterString+"</div>") : 
            ("<div class='col monoSeparator'>"+characterString+"</div>");
    }
});