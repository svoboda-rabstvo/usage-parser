## Classes

<dl>
<dt><a href="#Arg">Arg</a></dt>
<dd><p>Argument object of usage&#39;s doc</p></dd>
<dt><a href="#Section">Section</a></dt>
<dd><p>Section with arguments of usage&#39;s doc</p></dd>
<dt><a href="#Usage">Usage</a></dt>
<dd><p>Global Object which describe arguments with properties and sections for they</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#usageParser">usageParser(usage)</a> ⇒ <code><a href="#Usage">Usage</a></code></dt>
<dd><p>Trying to parse usage&#39;s doc and identify
arguments with properties and sections for they</p></dd>
</dl>

<a name="Arg"></a>

## Arg
<p>Argument object of usage's doc</p>

**Kind**: global class  

* [Arg](#Arg)
    * [new Arg(argLine, descLine, originLine)](#new_Arg_new)
    * _instance_
        * [.getType(line)](#Arg+getType) ⇒ [<code>ArgType</code>](#ArgType) \| <code>undefined</code>
        * [.getValues(line, reg)](#Arg+getValues) ⇒ <code>Array.&lt;string&gt;</code> \| <code>undefined</code>
        * [.firstMatch(line, reg)](#Arg+firstMatch) ⇒ <code>string</code> \| <code>undefined</code>
    * _static_
        * [.create(line)](#Arg.create) ⇒ [<code>Arg</code>](#Arg)

<a name="new_Arg_new"></a>

### new Arg(argLine, descLine, originLine)

| Param | Type | Description |
| --- | --- | --- |
| argLine | <code>string</code> \| <code>undefined</code> | <p>Part of origin string with argument names (without description)</p> |
| descLine | <code>string</code> | <p>Part of origin string with only description</p> |
| originLine | <code>string</code> | <p>Origin string with argument names and description</p> |

<a name="Arg+getType"></a>

### arg.getType(line) ⇒ [<code>ArgType</code>](#ArgType) \| <code>undefined</code>
<p>Try to identify type of argument by string of argument</p>

**Kind**: instance method of [<code>Arg</code>](#Arg)  
**Returns**: [<code>ArgType</code>](#ArgType) \| <code>undefined</code> - <p>Possible type of argument</p>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> \| <code>undefined</code> | <p>String with argument (without description)</p> |

<a name="Arg+getValues"></a>

### arg.getValues(line, reg) ⇒ <code>Array.&lt;string&gt;</code> \| <code>undefined</code>
<p>Get values of arguments by origin string and return it in array strings</p>

**Kind**: instance method of [<code>Arg</code>](#Arg)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>undefined</code> - <p>Array strings or undefined. Undefined if values cannot identify</p>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> \| <code>undefined</code> | <p>String with argument and description</p> |
| reg | <code>string</code> | <p>String for RegExp which can be identify possible values of argument. Should be save only first match</p> |

<a name="Arg+firstMatch"></a>

### arg.firstMatch(line, reg) ⇒ <code>string</code> \| <code>undefined</code>
<p>Run RegExp for line and return first match if it exist.</p>

**Kind**: instance method of [<code>Arg</code>](#Arg)  
**Returns**: <code>string</code> \| <code>undefined</code> - <p>First match in string format or undefined</p>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> \| <code>undefined</code> | <p>String for search</p> |
| reg | <code>string</code> | <p>String for RegExp. Should be save only first match</p> |

<a name="Arg.create"></a>

### Arg.create(line) ⇒ [<code>Arg</code>](#Arg)
<p>Create instance of Arg object by single line</p>

**Kind**: static method of [<code>Arg</code>](#Arg)  
**Returns**: [<code>Arg</code>](#Arg) - <p>Arg object</p>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | <p>Single line with argument and description</p> |

<a name="Section"></a>

## Section
<p>Section with arguments of usage's doc</p>

**Kind**: global class  

* [Section](#Section)
    * [new Section(name, [args], [lines])](#new_Section_new)
    * [.create()](#Section+create) ⇒ [<code>Section</code>](#Section)

<a name="new_Section_new"></a>

### new Section(name, [args], [lines])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> \| <code>undefined</code> |  | <p>name of section</p> |
| [args] | [<code>Array.&lt;Arg&gt;</code>](#Arg) \| <code>undefined</code> | <code>&quot;undefined&quot;</code> | <p>array of arguments</p> |
| [lines] | <code>Array.&lt;string&gt;</code> \| <code>undefined</code> | <code>&quot;undefined&quot;</code> | <p>array lines of section</p> |

<a name="Section+create"></a>

### section.create() ⇒ [<code>Section</code>](#Section)
<p>Creating instance of section by array of lines of section. Getting it from <code>this.lines</code></p>

**Kind**: instance method of [<code>Section</code>](#Section)  
**Returns**: [<code>Section</code>](#Section) - <p>Section object</p>  
**this**: <code>{Section}</code>  
<a name="Usage"></a>

## Usage
<p>Global Object which describe arguments with properties and sections for they</p>

**Kind**: global class  

* [Usage](#Usage)
    * [new Usage([sections])](#new_Usage_new)
    * [.create(lines)](#Usage.create) ⇒ [<code>Usage</code>](#Usage)

<a name="new_Usage_new"></a>

### new Usage([sections])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [sections] | [<code>Array.&lt;Section&gt;</code>](#Section) \| <code>undefined</code> | <code>&quot;undefined&quot;</code> | <p>Array of Sections object</p> |

<a name="Usage.create"></a>

### Usage.create(lines) ⇒ [<code>Usage</code>](#Usage)
<p>Create instance of Usage by array of lines</p>

**Kind**: static method of [<code>Usage</code>](#Usage)  
**Returns**: [<code>Usage</code>](#Usage) - <p>Usage object</p>  

| Param | Type | Description |
| --- | --- | --- |
| lines | <code>Array.&lt;string&gt;</code> | <p>array of lines with argument and sections</p> |

<a name="ArgType"></a>

## ArgType : <code>enum</code>
<p>Possible type of argument</p>

**Kind**: global enum  
<a name="usageParser"></a>

## usageParser(usage) ⇒ [<code>Usage</code>](#Usage)
<p>Trying to parse usage's doc and identify
arguments with properties and sections for they</p>

**Kind**: global function  
**Returns**: [<code>Usage</code>](#Usage) - <p>Usage object which include arguments in sections</p>  

| Param | Type | Description |
| --- | --- | --- |
| usage | <code>string</code> | <p>usage's doc</p> |

