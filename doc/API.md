## Classes

<dl>
<dt><a href="#Client">Client</a></dt>
<dd><p>The client for convert input string to Usage</p></dd>
<dt><a href="#UsageFactory">UsageFactory</a></dt>
<dd><p>The Usage Factory is describe how to create main parts of client</p></dd>
<dt><a href="#Arg">Arg</a></dt>
<dd><p>Argument object of usage&#39;s doc</p></dd>
<dt><a href="#Group">Group</a></dt>
<dd><p>The Group with name and array of lines</p></dd>
<dt><a href="#Section">Section</a></dt>
<dd><p>The section with arguments of usage&#39;s doc</p></dd>
<dt><a href="#Usage">Usage</a></dt>
<dd><p>The Usage is a Object which describe arguments with properties and sections for they</p></dd>
<dt><a href="#ArguemntConvertor">ArguemntConvertor</a></dt>
<dd><p>8</p></dd>
</dl>

## Members

<dl>
<dt><a href="#ArgType">ArgType</a> : <code>enum</code></dt>
<dd><p>Possible type of argument</p></dd>
<dt><a href="#ArgType">ArgType</a> : <code>Map.&lt;ArgType, Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Map which include type of argument and his aliases</p></dd>
<dt><a href="#argTypesMap">argTypesMap</a> ⇒ <code><a href="#ArgType">ArgType</a></code></dt>
<dd><p>Try to find ArgType in the line, default is <code>ArgType.undefined</code></p></dd>
</dl>

<a name="Client"></a>

## Client
<p>The client for convert input string to Usage</p>

**Kind**: global class  

* [Client](#Client)
    * [new Client(input, [factory])](#new_Client_new)
    * [.splitLine(input)](#Client+splitLine) ⇒ <code>Array.&lt;string&gt;</code>
    * [.createGroups(linesClear)](#Client+createGroups) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
    * [.createSections(groupsArray)](#Client+createSections) ⇒ [<code>Array.&lt;Section&gt;</code>](#Section)
    * [.create()](#Client+create) ⇒ [<code>Usage</code>](#Usage)

<a name="new_Client_new"></a>

### new Client(input, [factory])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | <p>The input string for convert</p> |
| [factory] | [<code>UsageFactory</code>](#UsageFactory) | <code>&quot;UsageFactory&quot;</code> | <p>The factory of Usage, default is <code>UsageFactory</code></p> |

<a name="Client+splitLine"></a>

### client.splitLine(input) ⇒ <code>Array.&lt;string&gt;</code>
<p>Split input by regExp from config and returns array of lines</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>The array of lines</p>  

| Param | Description |
| --- | --- |
| input | <p>input via string</p> |

<a name="Client+createGroups"></a>

### client.createGroups(linesClear) ⇒ [<code>Array.&lt;Group&gt;</code>](#Group)
<p>Create groups from lines, where identity of group is regExp from config</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: [<code>Array.&lt;Group&gt;</code>](#Group) - <ul>
<li>The array of groups</li>
</ul>  

| Param | Description |
| --- | --- |
| linesClear | <p>The array of lines</p> |

<a name="Client+createSections"></a>

### client.createSections(groupsArray) ⇒ [<code>Array.&lt;Section&gt;</code>](#Section)
<p>Create sections from groups</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: [<code>Array.&lt;Section&gt;</code>](#Section) - <ul>
<li>The array of sections</li>
</ul>  

| Param | Description |
| --- | --- |
| groupsArray | <p>The array of groups</p> |

<a name="Client+create"></a>

### client.create() ⇒ [<code>Usage</code>](#Usage)
<p>Try to convert input string to Usage</p>

**Kind**: instance method of [<code>Client</code>](#Client)  
**Returns**: [<code>Usage</code>](#Usage) - <ul>
<li>The Usage with sections and arguments</li>
</ul>  
<a name="UsageFactory"></a>

## UsageFactory
<p>The Usage Factory is describe how to create main parts of client</p>

**Kind**: global class  

* [UsageFactory](#UsageFactory)
    * [.argument(line)](#UsageFactory+argument) ⇒ [<code>Arg</code>](#Arg)
    * [.section(args, [name])](#UsageFactory+section) ⇒ [<code>Section</code>](#Section)
    * [.usage(sections, [delimiter])](#UsageFactory+usage) ⇒ [<code>Usage</code>](#Usage)

<a name="UsageFactory+argument"></a>

### usageFactory.argument(line) ⇒ [<code>Arg</code>](#Arg)
<p>Create Argument from the line. The line is splitting to 2 parts before create Argument</p>

**Kind**: instance method of [<code>UsageFactory</code>](#UsageFactory)  
**Returns**: [<code>Arg</code>](#Arg) - <ul>
<li>The Argument with properties</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> | <p>The line with argument, which needs to split</p> |

<a name="UsageFactory+section"></a>

### usageFactory.section(args, [name]) ⇒ [<code>Section</code>](#Section)
<p>Create section with name and arguments, clear empty arguments</p>

**Kind**: instance method of [<code>UsageFactory</code>](#UsageFactory)  
**Returns**: [<code>Section</code>](#Section) - <ul>
<li>The section with args</li>
</ul>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| args | [<code>Array.&lt;Arg&gt;</code>](#Arg) |  | <p>The array of args for section</p> |
| [name] | <code>string</code> \| <code>undefined</code> | <code>&quot;\&quot;undefined\&quot;&quot;</code> | <p>The name of section, default is <code>undefined</code></p> |

<a name="UsageFactory+usage"></a>

### usageFactory.usage(sections, [delimiter]) ⇒ [<code>Usage</code>](#Usage)
<p>Create Usage with section and delimiter, skip blocked sections</p>

**Kind**: instance method of [<code>UsageFactory</code>](#UsageFactory)  
**Returns**: [<code>Usage</code>](#Usage) - <ul>
<li>The Usage with delimiter and the array of sections</li>
</ul>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sections | [<code>Array.&lt;Section&gt;</code>](#Section) |  | <p>The array of sections for Usage</p> |
| [delimiter] | <code>string</code> \| <code>undefined</code> | <code>&quot;\&quot;undefined\&quot;&quot;</code> | <p>The delimiter of Usage, default is <code>undefined</code></p> |

<a name="Arg"></a>

## Arg
<p>Argument object of usage's doc</p>

**Kind**: global class  

* [Arg](#Arg)
    * [new Arg(argsLine, descLine)](#new_Arg_new)
    * _instance_
        * [.getType(argsLine)](#Arg+getType) ⇒ [<code>ArgType</code>](#ArgType)
        * [.getValues(line, reg)](#Arg+getValues) ⇒ <code>Array.&lt;string&gt;</code> \| <code>undefined</code>
    * _static_
        * [.create(argsLine, descLine)](#Arg.create) ⇒ [<code>Arg</code>](#Arg)

<a name="new_Arg_new"></a>

### new Arg(argsLine, descLine)

| Param | Type | Description |
| --- | --- | --- |
| argsLine | <code>string</code> \| <code>undefined</code> | <p>The line which include anything but description</p> |
| descLine | <code>string</code> | <p>The line which include only description</p> |

<a name="Arg+getType"></a>

### arg.getType(argsLine) ⇒ [<code>ArgType</code>](#ArgType)
<p>Try to identify ArgType from line, which include argument names</p>

**Kind**: instance method of [<code>Arg</code>](#Arg)  
**Returns**: [<code>ArgType</code>](#ArgType) - <ul>
<li>The ArgType of argument</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| argsLine | <code>string</code> \| <code>undefined</code> | <p>The line which include argument names</p> |

<a name="Arg+getValues"></a>

### arg.getValues(line, reg) ⇒ <code>Array.&lt;string&gt;</code> \| <code>undefined</code>
<p>Get values of arguments by origin string and return it in array strings</p>

**Kind**: instance method of [<code>Arg</code>](#Arg)  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>undefined</code> - <ul>
<li>The array strings or undefined. Undefined if values cannot identify</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>string</code> \| <code>undefined</code> | <p>The string with argument and description</p> |
| reg | <code>string</code> | <p>The string for RegExp which can be identify possible values of argument. Should be save only first match</p> |

<a name="Arg.create"></a>

### Arg.create(argsLine, descLine) ⇒ [<code>Arg</code>](#Arg)
<p>Create Arg with properties</p>

**Kind**: static method of [<code>Arg</code>](#Arg)  
**Returns**: [<code>Arg</code>](#Arg) - <ul>
<li>The Arg</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| argsLine | <code>string</code> \| <code>undefined</code> | <p>The line which include anything but description</p> |
| descLine | <code>string</code> | <p>The line which include only description</p> |

<a name="Group"></a>

## Group
<p>The Group with name and array of lines</p>

**Kind**: global class  

* [Group](#Group)
    * [new Group(name, [lines])](#new_Group_new)
    * _instance_
        * [.addLine(line, [identity], [joinChar])](#Group+addLine) ⇒ [<code>Group</code>](#Group)
    * _static_
        * [.create(name, [lines])](#Group.create) ⇒ [<code>Group</code>](#Group)

<a name="new_Group_new"></a>

### new Group(name, [lines])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> \| <code>undefined</code> |  | <p>The name of group</p> |
| [lines] | <code>Array.&lt;string&gt;</code> | <code>&quot;[]&quot;</code> | <p>The array of lines, default is []</p> |

<a name="Group+addLine"></a>

### group.addLine(line, [identity], [joinChar]) ⇒ [<code>Group</code>](#Group)
<p>Added line to Group. If it not contain argument, then join it with last line on the Group</p>

**Kind**: instance method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - <ul>
<li>The current Group with added line</li>
</ul>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| line | <code>String</code> |  | <p>The Input line for add</p> |
| [identity] | <code>String</code> | <code>&quot;from config&quot;</code> | <p>The string for identity argument, default from config</p> |
| [joinChar] | <code>String</code> | <code>&quot;from config&quot;</code> | <p>The string for join lines, default from config</p> |

<a name="Group.create"></a>

### Group.create(name, [lines]) ⇒ [<code>Group</code>](#Group)
<p>Create Group with name and array of lines</p>

**Kind**: static method of [<code>Group</code>](#Group)  
**Returns**: [<code>Group</code>](#Group) - <ul>
<li>The Group</li>
</ul>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> \| <code>undefined</code> |  | <p>The name of group</p> |
| [lines] | <code>Array.&lt;string&gt;</code> | <code>&quot;[]&quot;</code> | <p>The array of lines, default is <code>[]</code></p> |

<a name="Section"></a>

## Section
<p>The section with arguments of usage's doc</p>

**Kind**: global class  

* [Section](#Section)
    * [new Section(name, args)](#new_Section_new)
    * [.create(name, args)](#Section.create) ⇒ [<code>Section</code>](#Section)

<a name="new_Section_new"></a>

### new Section(name, args)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> \| <code>undefined</code> | <p>The name of section</p> |
| args | [<code>Array.&lt;Arg&gt;</code>](#Arg) | <p>The array of arguments</p> |

<a name="Section.create"></a>

### Section.create(name, args) ⇒ [<code>Section</code>](#Section)
<p>Create the section with arguments of usage's doc</p>

**Kind**: static method of [<code>Section</code>](#Section)  
**Returns**: [<code>Section</code>](#Section) - <ul>
<li>The Section</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> \| <code>undefined</code> | <p>The name of section</p> |
| args | [<code>Array.&lt;Arg&gt;</code>](#Arg) | <p>The array of arguments</p> |

<a name="Usage"></a>

## Usage
<p>The Usage is a Object which describe arguments with properties and sections for they</p>

**Kind**: global class  

* [Usage](#Usage)
    * [new Usage(sections, delimiter)](#new_Usage_new)
    * [.create(sections, delimiter)](#Usage.create) ⇒ [<code>Usage</code>](#Usage)

<a name="new_Usage_new"></a>

### new Usage(sections, delimiter)

| Param | Type | Description |
| --- | --- | --- |
| sections | [<code>Array.&lt;Section&gt;</code>](#Section) | <p>The array of Sections</p> |
| delimiter | <code>string</code> \| <code>undefined</code> | <p>The delimiter of usage</p> |

<a name="Usage.create"></a>

### Usage.create(sections, delimiter) ⇒ [<code>Usage</code>](#Usage)
<p>Create The Usage which describe arguments with properties and sections for they</p>

**Kind**: static method of [<code>Usage</code>](#Usage)  
**Returns**: [<code>Usage</code>](#Usage) - <ul>
<li>The Usage</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| sections | [<code>Array.&lt;Section&gt;</code>](#Section) | <p>The array of Sections</p> |
| delimiter | <code>string</code> \| <code>undefined</code> | <p>The delimiter of usage</p> |

<a name="ArguemntConvertor"></a>

## ArguemntConvertor
<p>8</p>

**Kind**: global class  
<a name="new_ArguemntConvertor_new"></a>

### new ArguemntConvertor()
<p>7</p>

<a name="ArgType"></a>

## ArgType : <code>enum</code>
<p>Possible type of argument</p>

**Kind**: global variable  
<a name="ArgType"></a>

## ArgType : <code>Map.&lt;ArgType, Array.&lt;string&gt;&gt;</code>
<p>Map which include type of argument and his aliases</p>

**Kind**: global variable  
<a name="argTypesMap"></a>

## argTypesMap ⇒ [<code>ArgType</code>](#ArgType)
<p>Try to find ArgType in the line, default is <code>ArgType.undefined</code></p>

**Kind**: global variable  
**Returns**: [<code>ArgType</code>](#ArgType) - <ul>
<li>The ArgType which find in line</li>
</ul>  

| Param | Description |
| --- | --- |
| line | <p>The line in which need to find ArgType</p> |

