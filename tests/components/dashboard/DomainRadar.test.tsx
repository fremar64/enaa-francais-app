import { render, screen } from '@testing-library/react';
import { DomainRadar } from '../../../components/dashboard/DomainRadar';
import React from 'react';

describe('DomainRadar', () => {
  it('affiche les labels de domaines', () => {
    const domainScores = { D1: 80, D2: 60, D3: 90, D4: 70, D5: 50 };
    render(<DomainRadar domainScores={domainScores} />);
    expect(screen.getByText('D1')).toBeInTheDocument();
    expect(screen.getByText('D2')).toBeInTheDocument();
    expect(screen.getByText('D3')).toBeInTheDocument();
    expect(screen.getByText('D4')).toBeInTheDocument();
    expect(screen.getByText('D5')).toBeInTheDocument();
  });
});
