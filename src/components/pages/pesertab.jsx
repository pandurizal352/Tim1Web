import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';
import { Search, Clock, X } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages-css/pesertab.css';

export default function ParticipantSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(saved);
  }, []);

  const addToHistory = (query) => {
    if (query.trim() && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      addToHistory(searchQuery);
      setShowHistory(false);
      alert(`Mencari: ${searchQuery}`);
    }
  };

  const selectFromHistory = (query) => {
    setSearchQuery(query);
    setShowHistory(false);
  };

  const removeFromHistory = (query, e) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter(h => h !== query);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="participant-search-wrapper">
      <div className="full-width-container">
        <Card className="search-card">
          <Card.Header className="search-header">
            <h4 className="mb-0">Pencarian Peserta</h4>
          </Card.Header>
          
          <Card.Body className="search-body">
            <Form>
              <Row className="g-3">
                <Col>
                  <div className="search-input-wrapper">
                    <Form.Control
                      type="text"
                      placeholder="Nama Peserta"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowHistory(true)}
                      onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                      className="search-input"
                    />

                    {showHistory && searchHistory.length > 0 && (
                      <Card className="history-dropdown">
                        <Card.Header className="history-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                              <Clock size={16} color="#456882" />
                              <small className="history-title">
                                Riwayat Pencarian
                              </small>
                            </div>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={clearHistory}
                              className="clear-history-btn"
                            >
                              <small>Hapus Semua</small>
                            </Button>
                          </div>
                        </Card.Header>
                        
                        <ListGroup variant="flush" className="history-list">
                          {searchHistory.map((query, index) => (
                            <ListGroup.Item
                              key={index}
                              action
                              onClick={() => selectFromHistory(query)}
                              className="history-item"
                            >
                              <div className="d-flex align-items-center gap-2">
                                <Clock size={16} color="#9ca3af" />
                                <span className="history-text">{query}</span>
                              </div>
                              <Button
                                variant="link"
                                size="sm"
                                onClick={(e) => removeFromHistory(query, e)}
                                className="remove-history-btn"
                              >
                                <X size={16} color="#9ca3af" />
                              </Button>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Card>
                    )}
                  </div>
                </Col>
                
                <Col xs="auto">
                  <Button
                    onClick={handleSearchClick}
                    className="search-button"
                  >
                    <Search size={20} />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}