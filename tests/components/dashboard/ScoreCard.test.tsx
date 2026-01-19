import { render, screen } from '@testing-library/react';
import { ScoreCard } from '../../../components/dashboard/ScoreCard';
import React from 'react';

describe('ScoreCard', () => {
  it('affiche le score et le niveau', () => {
    render(<ScoreCard score={420} cecrlLevel="B2" />);
    expect(screen.getByText('420')).toBeInTheDocument();
    expect(screen.getByText('Score CEREDIS')).toBeInTheDocument();
    expect(screen.getByText('B2')).toBeInTheDocument();
  });
});
