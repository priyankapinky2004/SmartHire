// src/pages/assessment/CreateAssessment.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: AssessmentQuestion[];
}

interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'coding' | 'text';
  content: string;
  options?: string[];
  correctAnswer?: string;
}

const CreateAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetSkills, setTargetSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [sections, setSections] = useState<AssessmentSection[]>([]);
  const [currentSection, setCurrentSection] = useState<AssessmentSection | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<AssessmentQuestion | null>(null);
  
  // Handler for adding a new skill
  const handleAddSkill = () => {
    if (skillInput.trim() && !targetSkills.includes(skillInput.trim())) {
      setTargetSkills([...targetSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };
  
  // Handler for removing a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setTargetSkills(targetSkills.filter(skill => skill !== skillToRemove));
  };
  
  // Handler for creating a new section
  const handleCreateSection = () => {
    setCurrentSection({
      id: `section-${Date.now()}`,
      title: '',
      description: '',
      timeLimit: 30,
      questions: []
    });
  };
  
  // Handler for saving the current section
  const handleSaveSection = () => {
    if (currentSection) {
      const updatedSections = [...sections];
      const existingIndex = sections.findIndex(s => s.id === currentSection.id);
      
      if (existingIndex >= 0) {
        updatedSections[existingIndex] = currentSection;
      } else {
        updatedSections.push(currentSection);
      }
      
      setSections(updatedSections);
      setCurrentSection(null);
    }
  };
  
  // Handler for editing a section
  const handleEditSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setCurrentSection({ ...section });
    }
  };
  
  // Handler for deleting a section
  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
  };
  
  // Handler for creating a new question
  const handleCreateQuestion = () => {
    if (!currentSection) return;
    
    setCurrentQuestion({
      id: `question-${Date.now()}`,
      type: 'multiple_choice',
      content: '',
      options: ['', '', '', '']
    });
  };
  
  // Handler for saving the current question
  const handleSaveQuestion = () => {
    if (currentSection && currentQuestion) {
      const updatedSection = { ...currentSection };
      const existingIndex = updatedSection.questions.findIndex(q => q.id === currentQuestion.id);
      
      if (existingIndex >= 0) {
        updatedSection.questions[existingIndex] = currentQuestion;
      } else {
        updatedSection.questions.push(currentQuestion);
      }
      
      setCurrentSection(updatedSection);
      setCurrentQuestion(null);
    }
  };
  
  // Handler for editing a question
  const handleEditQuestion = (questionId: string) => {
    if (!currentSection) return;
    
    const question = currentSection.questions.find(q => q.id === questionId);
    if (question) {
      setCurrentQuestion({ ...question });
    }
  };
  
  // Handler for deleting a question
  const handleDeleteQuestion = (questionId: string) => {
    if (!currentSection) return;
    
    const updatedSection = { ...currentSection };
    updatedSection.questions = updatedSection.questions.filter(q => q.id !== questionId);
    setCurrentSection(updatedSection);
  };
  
  // Handler for creating the assessment
  const handleCreateAssessment = () => {
    // In a real app, you would send the assessment data to your API
    console.log({
      title,
      description,
      targetSkills,
      sections
    });
    
    // Mock success and navigate back to assessments list
    alert('Assessment created successfully!');
    navigate('/assessments');
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/assessments"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Assessments
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Assessment</h1>
      
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="flex items-center relative">
            <div className={`rounded-full transition duration-500 ease-in-out h-10 w-10 flex items-center justify-center ${
              step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'
            }`}>
              <span className="text-white font-bold">1</span>
            </div>
            <div className={`text-sm font-medium ${step >= 1 ? 'text-indigo-600' : 'text-gray-500'} mt-2 absolute -bottom-6 w-32 text-center`}>Basic Info</div>
          </div>
          <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 2 ? 'border-indigo-600' : 'border-gray-300'}`}></div>
          <div className="flex items-center relative">
            <div className={`rounded-full transition duration-500 ease-in-out h-10 w-10 flex items-center justify-center ${
              step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'
            }`}>
              <span className="text-white font-bold">2</span>
            </div>
            <div className={`text-sm font-medium ${step >= 2 ? 'text-indigo-600' : 'text-gray-500'} mt-2 absolute -bottom-6 w-32 text-center`}>Sections</div>
          </div>
          <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 3 ? 'border-indigo-600' : 'border-gray-300'}`}></div>
          <div className="flex items-center relative">
            <div className={`rounded-full transition duration-500 ease-in-out h-10 w-10 flex items-center justify-center ${
              step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'
            }`}>
              <span className="text-white font-bold">3</span>
            </div>
            <div className={`text-sm font-medium ${step >= 3 ? 'text-indigo-600' : 'text-gray-500'} mt-2 absolute -bottom-6 w-32 text-center`}>Review</div>
          </div>
        </div>
      </div>
      
      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Basic Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Provide basic details about the assessment.</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Assessment Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Frontend Developer Technical Assessment"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe the purpose and scope of the assessment"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description of what the assessment will evaluate.
                </p>
              </div>
              
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Target Skills
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                    placeholder="e.g., JavaScript"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
                    onClick={handleAddSkill}
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {targetSkills.map((skill, index) => (
                    <span key={index} className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                      >
                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!title || targetSkills.length === 0}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  !title || targetSkills.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next: Add Sections
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Step 2: Sections */}
      {step === 2 && (
        <>
          {!currentSection && !currentQuestion && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Assessment Sections</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Create sections to organize your assessment questions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCreateSection}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Section
                </button>
              </div>
              <div className="border-t border-gray-200">
                {sections.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {sections.map((section) => (
                      <li key={section.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{section.title}</h4>
                            <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                            <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                              <span>{section.questions.length} questions</span>
                              <span>{section.timeLimit} minutes</span>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              onClick={() => handleEditSection(section.id)}
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSection(section.id)}
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No sections added yet. Click "Add Section" to create a new section.
                  </div>
                )}
              </div>
              
              <div className="px-4 py-4 sm:px-6 border-t border-gray-200 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={sections.length === 0}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    sections.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next: Review
                </button>
              </div>
            </div>
          )}
          
          {/* Section Editor */}
          {currentSection && !currentQuestion && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentSection.id.startsWith('section-') && !sections.find(s => s.id === currentSection.id)
                    ? 'Create New Section'
                    : 'Edit Section'}
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="section-title" className="block text-sm font-medium text-gray-700">
                      Section Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="section-title"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={currentSection.title}
                        onChange={(e) => setCurrentSection({ ...currentSection, title: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="section-description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="section-description"
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={currentSection.description}
                        onChange={(e) => setCurrentSection({ ...currentSection, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="section-time" className="block text-sm font-medium text-gray-700">
                      Time Limit (minutes)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="section-time"
                        min="1"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={currentSection.timeLimit}
                        onChange={(e) => setCurrentSection({ ...currentSection, timeLimit: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Section Questions</h4>
                    <button
                      type="button"
                      onClick={handleCreateQuestion}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Question
                    </button>
                  </div>
                  
                  {currentSection.questions.length > 0 ? (
                    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                      {currentSection.questions.map((question, index) => (
                        <li key={question.id} className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>
                            <span className="ml-2 text-sm text-gray-900 truncate max-w-lg">
                              {question.content || '[No question text]'}
                            </span>
                            <span className="ml-3 px-2 py-0.5 text-xs rounded-full bg-gray-100">
                              {question.type === 'multiple_choice' ? 'Multiple Choice' : 
                               question.type === 'coding' ? 'Coding' : 'Text Answer'}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditQuestion(question.id)}
                              className="text-indigo-600 hover:text-indigo-900 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="text-red-600 hover:text-red-900 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4 text-sm text-gray-500 border border-gray-200 rounded-md">
                      No questions added to this section yet.
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentSection(null)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSection}
                    disabled={!currentSection.title}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      !currentSection.title ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Save Section
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Question Editor */}
          {currentSection && currentQuestion && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentQuestion.id.startsWith('question-') && !currentSection.questions.find(q => q.id === currentQuestion.id)
                    ? 'Create New Question'
                    : 'Edit Question'}
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="question-type" className="block text-sm font-medium text-gray-700">
                      Question Type
                    </label>
                    <select
                      id="question-type"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={currentQuestion.type}
                      onChange={(e) => setCurrentQuestion({
                        ...currentQuestion,
                        type: e.target.value as 'multiple_choice' | 'coding' | 'text',
                        options: e.target.value === 'multiple_choice' ? ['', '', '', ''] : undefined,
                        correctAnswer: e.target.value === 'multiple_choice' ? '' : undefined
                      })}
                    >
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="coding">Coding</option>
                      <option value="text">Text Answer</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="question-content" className="block text-sm font-medium text-gray-700">
                      Question
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="question-content"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter your question here..."
                        value={currentQuestion.content}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, content: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                  
                  {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                    <div>
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-700">Answer Options</legend>
                        <div className="mt-1 space-y-3">
                          {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                id={`option-${index}`}
                                name="correct-answer"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                checked={currentQuestion.correctAnswer === option}
                                onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: option })}
                              />
                              <input
                                type="text"
                                className="ml-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...currentQuestion.options!];
                                  newOptions[index] = e.target.value;
                                  setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                }}
                              />
                              {index > 1 && (
                                <button
                                  type="button"
                                  className="ml-2 text-gray-400 hover:text-gray-500"
                                  onClick={() => {
                                    const newOptions = currentQuestion.options!.filter((_, i) => i !== index);
                                    setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                  }}
                                >
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {currentQuestion.options.length < 6 && (
                          <button
                            type="button"
                            className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                              setCurrentQuestion({
                                ...currentQuestion,
                                options: [...currentQuestion.options!, '']
                              });
                            }}
                          >
                            Add Option
                          </button>
                        )}
                      </fieldset>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentQuestion(null)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveQuestion}
                    disabled={!currentQuestion.content || (
                        currentQuestion.type === 'multiple_choice' &&
                        (!currentQuestion.options || currentQuestion.options.filter(o => o.trim()).length < 2 || !currentQuestion.correctAnswer)
                      )}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        !currentQuestion.content || (
                          currentQuestion.type === 'multiple_choice' &&
                          (!currentQuestion.options || currentQuestion.options.filter(o => o.trim()).length < 2 || !currentQuestion.correctAnswer)
                        ) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Save Question
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Step 3: Review */}
        {step === 3 && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Review Assessment</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Review your assessment before publishing.</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{title}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{description}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Target Skills</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {targetSkills.map((skill, index) => (
                        <span key={index} className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Sections</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {sections.map((section) => (
                        <li key={section.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">
                              <span className="font-medium">{section.title}</span>
                              <span className="text-gray-500"> - {section.questions.length} questions, {section.timeLimit} minutes</span>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Total Questions</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {sections.reduce((total, section) => total + section.questions.length, 0)}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Total Time</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {sections.reduce((total, section) => total + section.timeLimit, 0)} minutes
                  </dd>
                </div>
              </dl>
            </div>
            
            <div className="px-4 py-4 sm:px-6 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={handleCreateAssessment}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default CreateAssessment;