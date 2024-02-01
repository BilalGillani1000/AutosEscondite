import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Sample car brand and model arrays
// const carBrands = ["Toyota", "Tesla", "Ford", "Chevrolet", "Honda", "Hyundai", "Nissan", "BMW", "Mercedes-Benz"];
// const carModels = ["Camry", "Model S", "Mustang", "Camaro", "Civic", "Elantra", "Altima", "X5", "C-Class"];

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

const IdealCar = () => {
  
  const navigate=useNavigate();

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(0);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [makeSuggestions, setMakeSuggestions] = useState([]);
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const makesTrie = new Trie();
  const modelsTrie = new Trie();


  useEffect(() => {
    axios.get('http://localhost:4000/makers-and-models')
      .then(response => {
        const { makes, models } = response.data;
        setMakes(makes);
        setModels(models);
      })
      .catch(error => {
        console.error('Error fetching makes and models:', error);
      });
  }, []);
  useEffect(() => {
    // Insert car brands into the Trie only if cars is not null
    if (makes && models) {
      makes.forEach((make) => makesTrie.insert(make.toLowerCase()));
      models.forEach((model) => modelsTrie.insert(model.toLowerCase()));
    }
  }, [makes, models, makesTrie, modelsTrie]);

  // Insert car brands and models into the Trie
  

  const handleBrandChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setMake(userInput);

    // Search Trie for brand suggestions
    const prefixNode = makesTrie.searchPrefix(userInput);
    const suggestions = prefixNode ? makesTrie.getAllSuggestions(prefixNode, userInput) : [];
    setMakeSuggestions(suggestions);
  };

  const handleModelChange = (e) => {
    const userInput = e.target.value.toLowerCase();
    setModel(userInput);

    // Search Trie for model suggestions
    const prefixNode = modelsTrie.searchPrefix(userInput);
    const suggestions = prefixNode ? modelsTrie.getAllSuggestions(prefixNode, userInput) : [];
    setModelSuggestions(suggestions);
  };

  const handleBrandSuggestionClick = (suggestion) => {
    setMake(suggestion);
    setMakeSuggestions([]);
  };

  const handleModelSuggestionClick = (suggestion) => {
    setModel(suggestion);
    setModelSuggestions([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idealQuery={
        make: make,
        model: model,
        year: year
      };
      const response=await axios.post("http://localhost:4000/idealCar", idealQuery);
      if (response) {
        navigate(`/cars/${response.data.carId}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container style={{padding: "7% 0"}}>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <h2 className="text-center mb-5">Search for Your Ideal Car</h2>
          <Col md={"3"}>
            <Form.Group controlId="carBrand">
              <Form.Label>Car Brand</Form.Label>
              <Form.Control
                required
                type="text"
                value={make}
                onChange={handleBrandChange}
                placeholder="Enter a car brand..."
                autoComplete="off"
              />
              <div className="suggestions-container">
                {makeSuggestions.length > 0 && (
                  <div className="suggestions">
                    {makeSuggestions.map((suggestion, index) => (
                      <div key={index} onClick={() => handleBrandSuggestionClick(suggestion)}>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>
          </Col>
          <Col md={"3"}>
            <Form.Group controlId="carModel">
              <Form.Label>Car Model</Form.Label>
              <Form.Control
                required
                type="text"
                value={model}
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
          <Col md={"3"}>
            <Form.Group controlId="carSeats">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" required value={year} onChange={(e) => setYear(e.target.value)} placeholder="Manufacturing year" />
            </Form.Group>
          </Col>
          <Col md={"1"}>
            <Button style={{marginTop:"30px"}} variant="primary" type="submit" size='md'>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default IdealCar;