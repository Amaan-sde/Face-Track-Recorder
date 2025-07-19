# Contributing to FaceTrack Recorder

Thank you for your interest in contributing to FaceTrack Recorder! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Camera Testing](#camera-testing)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Set up the development environment**
4. **Create a feature branch** for your changes
5. **Make your changes** following our guidelines
6. **Test thoroughly** including camera functionality
7. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Modern browser with camera support
- Camera device for testing

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/facetrack-recorder.git
cd facetrack-recorder

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
VITE_APP_NAME=FaceTrack Recorder
VITE_CAMERA_DEFAULT_RESOLUTION=1920x1080
VITE_ENABLE_FACE_TRACKING=true
VITE_MAX_RECORDING_DURATION=600
VITE_STORAGE_QUOTA_MB=1000
```

## Contributing Process

### 1. Create an Issue

Before starting work, create an issue describing:
- The problem or feature request
- Proposed solution
- Any relevant context

### 2. Fork and Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 3. Make Changes

- Follow our [Code Standards](#code-standards)
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Test your changes thoroughly

### 4. Commit Guidelines

Use conventional commit format:

```
type(scope): description

Examples:
feat(camera): add resolution selection
fix(tracking): resolve face detection lag
docs(readme): update installation instructions
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Submit Pull Request

- Push your branch to GitHub
- Create a pull request with clear description
- Link related issues
- Wait for review and address feedback

## Code Standards

### JavaScript/React Guidelines

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Use optional chaining (`?.`) for safety
- Handle errors gracefully

### File Organization

```
src/
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   └── [Component].jsx # PascalCase naming
├── pages/              # Page components
│   └── feature-name/   # kebab-case for directories
├── utils/              # Utility functions
└── styles/             # Global styles
```

### Component Structure

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null);
  
  // Event handlers
  const handleEvent = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="component-container">
      {/* Component content */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func
};

ComponentName.defaultProps = {
  prop2: () => {}
};

export default ComponentName;
```

### Styling Guidelines

- Use Tailwind CSS classes
- Follow responsive design principles
- Maintain consistent spacing
- Use semantic color names
- Test on multiple screen sizes

## Testing Guidelines

### Manual Testing

1. **Basic Functionality**
   - All pages load correctly
   - Navigation works properly
   - No console errors

2. **Camera Features**
   - Camera permissions work
   - Video preview displays
   - Recording starts/stops correctly
   - Face tracking functions properly

3. **Browser Compatibility**
   - Test on Chrome, Firefox, Safari, Edge
   - Verify camera access on each browser
   - Check responsive design

### Testing Checklist

- [ ] Feature works as expected
- [ ] No regressions in existing functionality
- [ ] Camera permissions handled gracefully
- [ ] Error states display appropriate messages
- [ ] Performance is acceptable
- [ ] Code follows style guidelines

## Camera Testing

### Required Tests

1. **Permission Handling**
   - Test permission grant/deny scenarios
   - Verify error messages for denied permissions
   - Test re-requesting permissions

2. **Recording Functionality**
   - Test start/stop recording
   - Verify video quality settings
   - Test duration limits
   - Check storage handling

3. **Face Tracking**
   - Test face detection accuracy
   - Verify tracking overlay
   - Test with multiple faces
   - Test with no faces detected

### Testing Devices

Test on various devices:
- Desktop with built-in camera
- Desktop with external USB camera
- Laptop with integrated camera
- Different camera resolutions

## Reporting Issues

### Bug Reports

Include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Console errors (if any)
- Screenshots or recordings

### Feature Requests

Include:
- Problem description
- Proposed solution
- Use cases
- Technical considerations

## Pull Request Review Process

1. **Automated Checks**
   - CI pipeline must pass
   - No linting errors
   - Build succeeds

2. **Code Review**
   - Code quality and standards
   - Security considerations
   - Performance implications
   - Documentation updates

3. **Testing**
   - Manual testing by reviewers
   - Camera functionality verification
   - Cross-browser testing

## Release Process

1. Features are merged to `develop` branch
2. Testing and stabilization on `develop`
3. Release candidate created
4. Final testing and approval
5. Merge to `main` branch
6. Tag release and deploy

## Getting Help

- Create an issue for bugs or feature requests
- Join discussions for questions
- Review existing documentation
- Check FAQ section

## Recognition

Contributors will be recognized:
- Listed in project contributors
- Mentioned in release notes
- GitHub contributor badge

Thank you for contributing to FaceTrack Recorder! Your efforts help make this project better for everyone.