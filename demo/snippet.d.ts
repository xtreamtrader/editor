declare const snippet = "<h1>Welcome to <code>@curvenote/editor</code>!</h1><p>Feel free to \u27A1\uFE0F edit this document \u2B05\uFE0F, or for collaborative editing, check out <a href=\"curvenote.com\">curvenote.com</a>, which is a scientific writing platform that connects to Jupyter. We would love if you came and supported us! \u2764\uFE0F</p><img src=\"https://curvenote.dev/images/logo.png\" align=\"center\" width=\"70%\"><p><code>@curvenote/editor</code> is a markdown <em>accelerated</em> editor.</p><ul><li><p><code>#</code> Starting a line with a hash creates a header. Multiple <code>##</code>\u2019s creates a smaller header</p></li><li><p><code>*</code> Will create a bullet list. For numbered lists use <code>1.</code> or you can start at a higher number!</p></li><li><p><code>/</code> Will get you a list of the commands you can do</p></li><li><p><code>:</code> for emotion \uD83C\uDF89 \uD83E\uDD73 \uD83D\uDE80</p></li><li><p><code>`</code> for code or <code>```</code> for a code block!</p></li></ul><p>You can also configure the editor to show citations, like this one from Geophysics <cite-group><cite key=\"simpeg2015\"></cite></cite-group>. Try clicking on the citation! Or choose one from the list with a <code>[[</code> command</p><aside class=\"callout info\"><p>Speaking of commands! Try starting with a forward slash <code>/</code> after this callout panel.</p></aside><p></p><p>You can add all sorts of things, like call out panels, asides, <r-equation inline=\"\">\\LaTeX</r-equation>, equations, or embed videos!</p><r-equation>x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}</r-equation><p>This will also translate to various other markup languages, using <a href=\"https://github.com/curvenote/schema\">@curvenote/schema</a>, you can see MyST, <r-equation inline=\"\">\\LaTeX</r-equation> and HTML below.</p><h2>Interactivity</h2><r-var name=\"visitors\" value=\"3\" format=\".0f\"></r-var><r-var name=\"cost\" value=\"10\" format=\".0f\"></r-var><ul><li><p>Visitors: <r-range :value=\"visitors\" :change=\"{visitors: value}\" min=\"0\" max=\"100\" step=\"1\"></r-range> <r-display :value=\"visitors\" format=\"i\"></r-display></p></li><li><p>Cost: <r-range :value=\"cost\" :change=\"{cost: value}\" min=\"0\" max=\"100\" step=\"1\"></r-range> <r-display :value=\"cost\" format=\"i\"></r-display></p></li></ul><p>If there are <r-display :value=\"visitors\" format=\"i\"></r-display> visitors and the admission cost is <r-display :value=\"cost\" format=\"$\"></r-display>, the park will make <r-display :value=\"visitors*cost\" format=\"$,.2f\"></r-display>.</p><iframe src=\"https://www.loom.com/embed/524085f9c64e4652a12bd81a374d58df\" align=\"center\" width=\"70%\"></iframe><p></p>";
export default snippet;
