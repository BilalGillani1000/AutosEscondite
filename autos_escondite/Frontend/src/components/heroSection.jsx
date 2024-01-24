import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import video from "../content/videos/mainVideo.mp4";
import "../styles/styles.css";

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

const HeroSection = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const trie = new Trie();

  // Example car brands
  const carBrands = ["Toyota", "Tesla", "Ford", "Chevrolet", "Honda", "Hyundai", "Nissan", "BMW", "Mercedes-Benz"];

  // Insert car brands into the Trie
  carBrands.forEach((brand) => {
    trie.insert(brand.toLowerCase()); // Convert to lowercase for case-insensitive matching
  });

  const handleInputChange = (event) => {
    const userInput = event.target.value.toLowerCase();
    setInput(userInput);

    // Search Trie for suggestions
    const prefixNode = trie.searchPrefix(userInput);
    const suggestions = prefixNode ? trie.getAllSuggestions(prefixNode, userInput) : [];
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the selected values as needed (e.g., send to backend, update state, etc.)
    console.log('Selected brand:', input);
  };

  return (
    <Container className="mt-5">
      <video width="100%" height="100%" controls muted>
        <source src={video} type="video/mp4"></source>
      </video>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="carBrand">
              <Form.Label>Car Brand</Form.Label>
              <Form.Control
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter a car brand..."
              />
              <div className="suggestions-container">
                {suggestions.length > 0 && (
                  <div className="suggestions">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
