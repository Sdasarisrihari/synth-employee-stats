
create or replace function get_salary_distribution()
returns table (
  range text,
  count bigint
) language sql as $$
  with salary_ranges as (
    select
      case
        when salary < 30000 then 'Under $30k'
        when salary between 30000 and 49999 then '$30k-$50k'
        when salary between 50000 and 69999 then '$50k-$70k'
        when salary between 70000 and 89999 then '$70k-$90k'
        when salary between 90000 and 109999 then '$90k-$110k'
        else 'Over $110k'
      end as range
    from employees
  )
  select
    range,
    count(*) as count
  from salary_ranges
  group by range
  order by
    case range
      when 'Under $30k' then 1
      when '$30k-$50k' then 2
      when '$50k-$70k' then 3
      when '$70k-$90k' then 4
      when '$90k-$110k' then 5
      else 6
    end;
$$;
