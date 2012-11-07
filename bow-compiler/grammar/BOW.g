grammar BOW;

options {
    output=AST;
    ASTLabelType=CommonTree; // type of $stat.tree ref etc...
}

@header {
package org.nabucco.bow.compiler;
}

@lexer::header {
package org.nabucco.bow.compiler;
}

prog:   ( stat {System.out.println($stat.tree.toStringTree());} )+ ;

stat:   expr NEWLINE        -> expr
    |   ID '=' expr NEWLINE -> ^('=' ID expr)
    |   NEWLINE             ->
    ;

expr:   multExpr (('+'^|'-'^) multExpr)*
    ; 

multExpr
    :   atom ('*'^ atom)*
    ; 

atom:   INT 
    |   ID
    |   '('! expr ')'!
    ;

ID  :   ('a'..'z'|'A'..'Z')+ ;
INT :   '0'..'9'+ ;
NEWLINE:'\r'? '\n' ;
WS  :   (' '|'\t')+ {skip();} ;