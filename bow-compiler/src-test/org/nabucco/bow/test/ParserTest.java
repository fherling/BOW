/**
 * 
 */
package org.nabucco.bow.test;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.antlr.runtime.ANTLRStringStream;
import org.antlr.runtime.CommonTokenStream;
import org.antlr.runtime.RecognitionException;
import org.antlr.runtime.tree.CommonTree;
import org.junit.Test;
import org.nabucco.bow.compiler.BOWLexer;
import org.nabucco.bow.compiler.BOWParser;

/**
 * @author fassmus
 * 
 */
public class ParserTest {

	@Test
	public void buildTreeTest() throws IOException, RecognitionException {
		ANTLRStringStream input = new ANTLRStringStream("2+3*4\n");
		BOWLexer lexer = new BOWLexer(input);
		CommonTokenStream tokens = new CommonTokenStream(lexer);
		BOWParser parser = new BOWParser(tokens);
		BOWParser.prog_return r = parser.prog();

		// Create Tree
		CommonTree t = (CommonTree) r.getTree();
		
		assertNotNull(t);
	}

}
