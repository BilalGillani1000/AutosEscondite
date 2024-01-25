import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

// Sample car brand and model arrays
const carBrands = ["Toyota", "Tesla", "Ford", "Chevrolet", "Honda", "Hyundai", "Nissan", "BMW", "Mercedes-Benz"];
const carModels = ["Camry", "Model S", "Mustang", "Camaro", "Civic", "Elantra", "Altima", "X5", "C-Class"];

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  searchPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return null; // Prefix not found
      }
      node = node.children[char];
    }
    return node;
  }

  getAllSuggestions(node, prefix) {
    const suggestions = [];
    this.traverse(node, prefix, suggestions);
    return suggestions;
  }

  traverse(node, currentPrefix, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push(currentPrefix);
    }

    for (const [char, childNode] of Object.entries(node.children)) {
      this.traverse(childNode, currentPrefix + char, suggestions);
    }
  }
}

const Test = () => {
  const [brandInput, setBrandInput] = useState('');
  const [modelInput, setModelInput] = useState('');
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const brandTrie = new Trie();
  const modelTrie = new Trie();

  // Insert car brands and models into the Trie
  carBrands.forEach((brand) => brandTrie.insert(brand.toLowerCase()));
  carModels.forEach((model) => modelTrie.insert(model.toLowerCase()));

  const handleBrandChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setBrandInput(userInput);

    // Search Trie for brand suggestions
    const prefixNode = brandTrie.searchPrefix(userInput);
    const suggestions = prefixNode ? brandTrie.getAllSuggestions(prefixNode, userInput) : [];
    setBrandSuggestions(suggestions);
  };

  const handleModelChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setModelInput(userInput);

    // Search Trie for model suggestions
    const prefixNode = modelTrie.searchPrefix(userInput);
    const suggestions = prefixNode ? modelTrie.getAllSuggestions(prefixNode, userInput) : [];
    setModelSuggestions(suggestions);
  };

  const handleBrandSuggestionClick = (suggestion) => {
    setBrandInput(suggestion);
    setBrandSuggestions([]);
  };

  const handleModelSuggestionClick = (suggestion) => {
    setModelInput(suggestion);
    setModelSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the form submission or update state as needed
    console.log('Selected Car Brand:', brandInput);
    console.log('Selected Car Model:', modelInput);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="carBrand">
              <Form.Label>Car Brand</Form.Label>
              <Form.Control
                type="text"
                value={brandInput}
                onChange={handleBrandChange}
                placeholder="Enter a car brand..."
                autoComplete="off"
              />
              <div className="suggestions-container">
                {brandSuggestions.length > 0 && (
                  <div className="suggestions">
                    {brandSuggestions.map((suggestion, index) => (
                      <div key={index} onClick={() => handleBrandSuggestionClick(suggestion)}>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="carModel">
              <Form.Label>Car Model</Form.Label>
              <Form.Control
                type="text"
                value={modelInput}
                onChange={handleModelChange}
                placeholder="Enter a car model..."
                autoComplete="off"
              />
              <div className="suggestions-container">
                {modelSuggestions.length > 0 && (
                  <div className="suggestions">
                    {modelSuggestions.map((suggestion, index) => (
                      <div key={index} onClick={() => handleModelSuggestionClick(suggestion)}>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Test;