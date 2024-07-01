package main

import (
	"fmt"
	"log"
	"strings"
)

type token struct {
	kind  string
	value string
}

func tokenizer(input string) []token {
	input += "\n"
	current := 0
	tokens := []token{}

	for current < len([]rune(input)) {
		char := string([]rune(input)[current])

		if char == "(" || char == ")" {
			tokens = append(tokens, token{
				kind:  "paren",
				value: char,
			})
			current++
			continue
		}

		if char == " " {
			current++
			continue
		}

		if isNumber(char) {
			value := ""
			for current < len([]rune(input)) && isNumber(string([]rune(input)[current])) {
				value += string([]rune(input)[current])
				current++
			}
			tokens = append(tokens, token{
				kind:  "number",
				value: value,
			})
			continue
		}

		if isLetter(char) {
			value := ""
			for current < len([]rune(input)) && isLetter(string([]rune(input)[current])) {
				value += string([]rune(input)[current])
				current++
			}
			tokens = append(tokens, token{
				kind:  "name",
				value: value,
			})
			continue
		}

		log.Fatalf("Unknown character: %s", char)
	}

	return tokens
}

func isNumber(input string) bool {
	if input == "" {
		return false
	}
	n := []rune(input)[0]
	if n >= '0' && n <= '9' {
		return true
	}
	return false
}

func isLetter(char string) bool {
	if char == "" {
		return false
	}
	n := []rune(char)[0]
	if n >= 'a' && n <= 'z' {
		return true
	}
	return false
}

type node struct {
	kind       string
	value      string
	name       string
	callee     *node
	expression *node
	body       []node
	params     []node
	arguments  *[]node
	context    *[]node
}

type ast node

var pc int

var pt []token

func parser(tokens []token) ast {
	pc = 0
	pt = tokens

	ast := ast{
		kind: "Program",
		body: []node{},
	}

	for pc < len(pt) {
		ast.body = append(ast.body, walk())
	}

	return ast
}

func walk() node {
	if pc >= len(pt) {
		log.Fatal("Unexpected end of input")
	}
	token := pt[pc]

	if token.kind == "number" {
		pc++
		return node{
			kind:  "NumberLiteral",
			value: token.value,
		}
	}

	if token.kind == "paren" && token.value == "(" {
		pc++
		if pc >= len(pt) {
			log.Fatal("Unexpected end of input after opening parenthesis")
		}
		token = pt[pc]

		n := node{
			kind:   "CallExpression",
			name:   token.value,
			params: []node{},
		}

		pc++
		for pc < len(pt) {
			if pt[pc].kind == "paren" && pt[pc].value == ")" {
				pc++ // Move past the closing parenthesis
				return n
			}
			n.params = append(n.params, walk())
		}

		log.Fatal("Missing closing parenthesis")
	}

	log.Fatalf("Unexpected token: %v", token)
	return node{}
}

type visitor map[string]func(n *node, p node)

func traverser(a ast, v visitor) {
	traverseNode(node(a), node{}, v) //top level of the ast doesn't have a parent
}

func traverseArray(a []node, p node, v visitor) {
	for _, child := range a {
		traverseNode(child, p, v)
	}
}

func traverseNode(node, p node, v visitor) {
	for k, va := range v {
		if k == node.kind {
			va(&node, p)
		}
	}

	switch node.kind {
	case "Program":
		traverseArray(node.body, node, v)
		break
	case "CallExpression":
		traverseArray(node.params, node, v)
		break
	case "NumberLiteral":
		break
	default:
		fmt.Printf("Unknown node kind: %s\n", node.kind)
	}
}

func transformer(a ast) ast {
	nast := ast{
		kind: "Program",
		body: []node{},
	}

	a.context = &nast.body

	traverser(a, map[string]func(n *node, p node){
		"NumberLiteral": func(n *node, p node) {
			*p.context = append(*p.context, node{
				kind:  "NumberExpression",
				value: n.value,
			})
		},
		"CallExpression": func(n *node, p node) {
			e := node{
				kind: "CallExpression",
				callee: &node{
					kind: "Identifier",
					name: n.name,
				},
				params: []node{},
			}
			n.context = e.arguments

			if p.kind != "CallExpression" {
				es := node{
					kind:       "ExpressionStatement",
					expression: &e,
				}

				*p.context = append(*p.context, es)
			} else {
				*p.context = append(*p.context, e)
			}

		},
	})

	return nast
}

func codeGenerator(n node) string {

	switch n.kind {
	case "Program":
		var r []string
		for _, no := range n.body {
			r = append(r, codeGenerator(no))
		}
		return strings.Join(r, "\n")

	case "ExpressionStatement":
		return codeGenerator(*n.expression) + ";"

	case "CallExpression":
		var ra []string
		c := codeGenerator(*n.callee)

		for _, no := range *n.arguments {
			ra = append(ra, codeGenerator(no))
		}

		r := strings.Join(ra, ", ")
		return c + "(" + r + ")"

	case "Identifier":
		return n.name

	case "NumberLiteral":
		return n.value

	default:
		log.Fatal("err")
		return ""
	}
}

func compiler(input string) string {
	tokens := tokenizer(input)
	ast := parser(tokens)
	nast := transformer(ast)
	out := codeGenerator(node(nast))
	return out
}

func main() {
	program := "(add 10 (subtract 10 6))"
	out := compiler(program)
	fmt.Println(out)
}
