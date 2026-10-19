import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('shows a check when checked', () => {
    render(<Checkbox aria-label="All" checked={true} />);

    const box = screen.getByRole('checkbox', { name: 'All' });
    expect(box).toHaveAttribute('aria-checked', 'true');
    expect(box.querySelector('.lucide-check')).not.toBeNull();
    expect(box.querySelector('.lucide-minus')).toBeNull();
  });

  it('shows a dash, styled like checked, when only some children are selected', () => {
    render(<Checkbox aria-label="Some" checked="indeterminate" />);

    const box = screen.getByRole('checkbox', { name: 'Some' });
    expect(box).toHaveAttribute('aria-checked', 'mixed');
    expect(box).toHaveAttribute('data-state', 'indeterminate');
    expect(box).toHaveClass('data-[state=indeterminate]:bg-surface-submit');
    expect(box.querySelector('.lucide-minus')).not.toBeNull();
    expect(box.querySelector('.lucide-check')).toBeNull();
  });

  it('shows nothing when unchecked', () => {
    render(<Checkbox aria-label="None" checked={false} />);

    const box = screen.getByRole('checkbox', { name: 'None' });
    expect(box).toHaveAttribute('aria-checked', 'false');
    expect(box.querySelector('svg')).toBeNull();
  });
});
